"""End-to-end tests through Home Assistant: setup, WebSocket API, sensors, card."""

from __future__ import annotations

import pytest
from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.message_board.const import CARD_URL, CONF_USERS, DOMAIN

CLIENT_ID = "https://example.com/app"


async def _token_for(hass: HomeAssistant, user) -> str:
    refresh = await hass.auth.async_create_refresh_token(user, CLIENT_ID)
    return hass.auth.async_create_access_token(refresh)


@pytest.fixture
async def setup(hass: HomeAssistant, hass_admin_user, hass_ws_client):
    """Board for the admin ('Mock User') and a second, non-admin user 'Bob'."""
    bob = await hass.auth.async_create_user("Bob", group_ids=["system-users"])
    entry = MockConfigEntry(domain=DOMAIN, data={CONF_USERS: [hass_admin_user.id, bob.id]})
    entry.add_to_hass(hass)
    assert await async_setup_component(hass, DOMAIN, {})
    await hass.async_block_till_done()

    alice_ws = await hass_ws_client(hass)
    bob_ws = await hass_ws_client(hass, await _token_for(hass, bob))
    return hass_admin_user, bob, alice_ws, bob_ws


async def _cmd(ws, command: str, **payload):
    """Send a command and return its result, skipping subscription events."""
    await ws.send_json_auto_id({"type": f"{DOMAIN}/{command}", **payload})
    while (msg := await ws.receive_json())["type"] != "result":
        pass
    return msg


async def _subscribe(ws) -> dict:
    assert (await _cmd(ws, "subscribe"))["success"]
    return (await ws.receive_json())["event"]


async def test_full_flow(hass: HomeAssistant, setup) -> None:
    alice, bob, alice_ws, bob_ws = setup
    sensor_alice = "binary_sensor.message_board_unread_mock_user"
    sensor_bob = "binary_sensor.message_board_unread_bob"

    first = await _subscribe(bob_ws)
    assert first["me"] == bob.id
    assert {u["name"] for u in first["users"]} == {"Mock User", "Bob"}
    assert first["threads"] == []

    # Alice posts into Bob's inbox: only Bob's sensor turns on.
    assert (await _cmd(alice_ws, "create", recipient=bob.id, text="Einkaufen?"))["success"]
    pushed = (await bob_ws.receive_json())["event"]
    (thread,) = pushed["threads"]
    assert thread["unread"] is True
    assert "me" not in pushed  # static context only in the first event
    await hass.async_block_till_done()
    assert hass.states.get(sensor_bob).state == "on"
    assert hass.states.get(sensor_alice).state == "off"

    # Bob reads it: sensor off.
    assert (await _cmd(bob_ws, "mark_read", thread_id=thread["id"]))["success"]
    await hass.async_block_till_done()
    assert hass.states.get(sensor_bob).state == "off"

    # Bob may not edit Alice's message.
    msg_id = thread["messages"][0]["id"]
    result = await _cmd(bob_ws, "edit", thread_id=thread["id"], message_id=msg_id, text="x")
    assert result["error"]["code"] == "unauthorized"

    # Bob replies: Alice's sensor on.
    assert (await _cmd(bob_ws, "reply", thread_id=thread["id"], text="Ja 👍"))["success"]
    await hass.async_block_till_done()
    assert hass.states.get(sensor_alice).state == "on"
    assert hass.states.get(sensor_alice).attributes["unread_threads"] == 1

    # Bob archives: archived threads don't count as unread.
    assert (await _cmd(bob_ws, "archive", thread_id=thread["id"], archived=True))["success"]
    await hass.async_block_till_done()
    assert hass.states.get(sensor_alice).state == "off"


async def test_reaction_schema_rejects_unknown_emoji(hass: HomeAssistant, setup) -> None:
    _, bob, alice_ws, _ = setup
    await _cmd(alice_ws, "create", recipient=bob.id, text="Hi")
    result = await _cmd(alice_ws, "react", thread_id="x", message_id="y", emoji="🦄")
    assert result["error"]["code"] == "invalid_format"


async def test_non_member_rejected(hass: HomeAssistant, setup, hass_ws_client) -> None:
    carol = await hass.auth.async_create_user("Carol", group_ids=["system-users"])
    carol_ws = await hass_ws_client(hass, await _token_for(hass, carol))
    result = await _cmd(carol_ws, "subscribe")
    assert result["error"]["code"] == "unauthorized"


async def test_card_is_served(hass: HomeAssistant, setup, hass_client) -> None:
    client = await hass_client()
    response = await client.get(CARD_URL)
    assert response.status == 200
    assert "message-board-card" in await response.text()


async def test_config_flow(hass: HomeAssistant, hass_admin_user) -> None:
    bob = await hass.auth.async_create_user("Bob", group_ids=["system-users"])
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {CONF_USERS: [bob.id]}
    )
    assert result["errors"] == {CONF_USERS: "too_few_users"}
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {CONF_USERS: [hass_admin_user.id, bob.id]}
    )
    assert result["type"] == "create_entry"
