"""WebSocket commands used by the Lovelace card.

The acting user is always taken from the authenticated connection,
never from the client payload.
"""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.util.hass_dict import HassKey

from .board import Board, BoardError, is_unread
from .const import DOMAIN, REACTIONS

DATA_BOARD: HassKey[Board] = HassKey(DOMAIN)

Apply = Callable[[Board, str, dict[str, Any]], object]


@callback
def async_register(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_subscribe)
    for command in _MUTATIONS:
        websocket_api.async_register_command(hass, command)


def _board(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg_id: int
) -> Board | None:
    """Return the board, or send an error and return None."""
    board = hass.data.get(DATA_BOARD)
    if board is None:
        connection.send_error(msg_id, "not_loaded", "Message board is not set up")
        return None
    if connection.user.id not in board.users:
        connection.send_error(msg_id, "unauthorized", "User is not a board member")
        return None
    return board


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/subscribe"})
@websocket_api.async_response
async def ws_subscribe(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Stream the user's threads.

    The first event carries static context (me, users, reactions),
    every following event only the updated threads.
    """
    if (board := _board(hass, connection, msg["id"])) is None:
        return
    me = connection.user.id
    users = [
        {
            "id": user_id,
            "name": user.name if (user := await hass.auth.async_get_user(user_id)) else user_id,
        }
        for user_id in board.users
    ]

    @callback
    def push(**context: Any) -> None:
        # "unread" is computed here so the card never re-implements the rule.
        threads = [{**t, "unread": is_unread(t, me)} for t in board.threads_for(me)]
        connection.send_message(
            websocket_api.event_message(msg["id"], {**context, "threads": threads})
        )

    connection.subscriptions[msg["id"]] = board.add_listener(push)
    connection.send_result(msg["id"])
    push(me=me, users=users, reactions=REACTIONS)


def _mutation(command: str, schema: dict[Any, Any], apply: Apply) -> Callable[..., None]:
    """Build a command handler that applies one board operation."""

    @websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/{command}", **schema})
    @callback
    def handler(
        hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
    ) -> None:
        if (board := _board(hass, connection, msg["id"])) is None:
            return
        try:
            apply(board, connection.user.id, msg)
        except BoardError as err:
            connection.send_error(msg["id"], err.code, str(err))
            return
        connection.send_result(msg["id"])

    return handler


_THREAD = {vol.Required("thread_id"): str}
_MESSAGE = {**_THREAD, vol.Required("message_id"): str}
_TEXT = {vol.Required("text"): str}

_MUTATIONS = (
    _mutation(
        "create",
        {vol.Required("recipient"): str, **_TEXT},
        lambda b, user, m: b.create_thread(user, m["recipient"], m["text"]),
    ),
    _mutation(
        "reply",
        {**_THREAD, **_TEXT},
        lambda b, user, m: b.reply(user, m["thread_id"], m["text"]),
    ),
    _mutation(
        "edit",
        {**_MESSAGE, **_TEXT},
        lambda b, user, m: b.edit(user, m["thread_id"], m["message_id"], m["text"]),
    ),
    _mutation(
        "react",
        {**_MESSAGE, vol.Required("emoji"): vol.In(REACTIONS)},
        lambda b, user, m: b.toggle_reaction(user, m["thread_id"], m["message_id"], m["emoji"]),
    ),
    _mutation(
        "archive",
        {**_THREAD, vol.Required("archived"): bool},
        lambda b, user, m: b.set_archived(user, m["thread_id"], m["archived"]),
    ),
    _mutation(
        "mark_read",
        _THREAD,
        lambda b, user, m: b.mark_read(user, m["thread_id"]),
    ),
)
