"""WebSocket commands used by the Lovelace card.

The acting user is always taken from the authenticated connection,
never from the client payload.
"""

from __future__ import annotations

import re
from collections.abc import Callable
from pathlib import Path
from typing import Any
from urllib.parse import quote

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.util.hass_dict import HassKey

from .board import Board, BoardError, is_unread
from .const import (
    DEFAULT_PRIORITY,
    DOMAIN,
    MEME_EXTENSIONS,
    MEMES_DIR,
    MEMES_URL,
    PRIORITIES,
    REACTIONS,
)

DATA_BOARD: HassKey[Board] = HassKey(DOMAIN)

Apply = Callable[[Board, str, dict[str, Any]], object]


@callback
def async_register(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_subscribe)
    websocket_api.async_register_command(hass, ws_memes)
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

    The first event carries static context (me, users, reactions, priorities),
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
    push(me=me, users=users, reactions=REACTIONS, priorities=PRIORITIES)


MEME_NAME = re.compile(r"^[a-z0-9_-]+$")


def list_memes(folder: Path) -> list[dict[str, str]]:
    """Images in the meme folder as [{name, url}], sorted by name. Blocking I/O.

    Files whose name is not a valid shortcode (a-z, 0-9, _ and -) are skipped,
    so a shortcode always maps to exactly one file.
    """
    memes = {}
    for file in sorted(folder.iterdir()) if folder.is_dir() else []:
        name = file.stem.lower()
        if file.suffix.lower() in MEME_EXTENSIONS and MEME_NAME.match(name):
            memes.setdefault(name, f"{MEMES_URL}/{quote(file.name)}")
    return [{"name": name, "url": url} for name, url in sorted(memes.items())]


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/memes"})
@websocket_api.async_response
async def ws_memes(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """List meme images. Read on demand, so new files appear without a restart."""
    if _board(hass, connection, msg["id"]) is None:
        return
    folder = Path(hass.config.path(MEMES_DIR))
    connection.send_result(msg["id"], await hass.async_add_executor_job(list_memes, folder))


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
_TAGS = vol.All([str])
_PRIORITY = vol.In(PRIORITIES)

_MUTATIONS = (
    _mutation(
        "create",
        {
            vol.Required("recipient"): str,
            vol.Required("title"): str,
            vol.Optional("text", default=""): str,
            vol.Optional("tags", default=[]): _TAGS,
            vol.Optional("priority", default=DEFAULT_PRIORITY): _PRIORITY,
        },
        lambda b, user, m: b.create_thread(
            user, m["recipient"], m["title"], m["text"], m["tags"], m["priority"]
        ),
    ),
    _mutation(
        "update",
        {
            **_THREAD,
            vol.Optional("title"): str,
            vol.Optional("text"): str,
            vol.Optional("tags"): _TAGS,
            vol.Optional("priority"): _PRIORITY,
        },
        lambda b, user, m: b.update_post(
            user, m["thread_id"], m.get("title"), m.get("text"), m.get("tags"), m.get("priority")
        ),
    ),
    _mutation(
        "delete",
        _THREAD,
        lambda b, user, m: b.delete_thread(user, m["thread_id"]),
    ),
    _mutation(
        "reply",
        {**_THREAD, **_TEXT},
        lambda b, user, m: b.reply(user, m["thread_id"], m["text"]),
    ),
    _mutation(
        "edit",
        {**_MESSAGE, **_TEXT},
        lambda b, user, m: b.edit_comment(user, m["thread_id"], m["message_id"], m["text"]),
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
