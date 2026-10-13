"""Message Board: threaded inboxes between Home Assistant users."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.storage import Store
from homeassistant.helpers.typing import ConfigType
from homeassistant.loader import async_get_integration

from . import websocket_api
from .board import Board
from .const import CARD_URL, CONF_USERS, DOMAIN, STORAGE_KEY, STORAGE_VERSION
from .websocket_api import DATA_BOARD

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)
PLATFORMS = [Platform.BINARY_SENSOR]

type MessageBoardConfigEntry = ConfigEntry[Board]


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Register WebSocket commands and serve the card (once per HA start)."""
    websocket_api.async_register(hass)
    card_file = Path(__file__).parent / "frontend" / "message-board-card.js"
    await hass.http.async_register_static_paths(
        [StaticPathConfig(CARD_URL, str(card_file), cache_headers=True)]
    )
    # Version query busts the browser cache after updates.
    version = (await async_get_integration(hass, DOMAIN)).version
    add_extra_js_url(hass, f"{CARD_URL}?v={version}")
    return True


async def async_setup_entry(hass: HomeAssistant, entry: MessageBoardConfigEntry) -> bool:
    board = Board(Store(hass, STORAGE_VERSION, STORAGE_KEY), entry.data[CONF_USERS])
    await board.async_load()
    entry.runtime_data = board
    hass.data[DATA_BOARD] = board
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: MessageBoardConfigEntry) -> bool:
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unloaded:
        hass.data.pop(DATA_BOARD, None)
    return unloaded
