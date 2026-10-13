"""One 'unread' binary sensor per board member.

This is the board's only outward interface: whatever should react to
unread messages (lights, notifications, dashboards) consumes these entities.
"""

from __future__ import annotations

from homeassistant.components.binary_sensor import BinarySensorEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import MessageBoardConfigEntry
from .board import Board


async def async_setup_entry(
    hass: HomeAssistant,
    entry: MessageBoardConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    board = entry.runtime_data
    entities = []
    for user_id in board.users:
        user = await hass.auth.async_get_user(user_id)
        name = user.name if user and user.name else user_id
        entities.append(UnreadSensor(board, entry.entry_id, user_id, name))
    async_add_entities(entities)


class UnreadSensor(BinarySensorEntity):
    """On while the user has at least one unread thread."""

    _attr_should_poll = False
    _attr_icon = "mdi:email-alert"

    def __init__(self, board: Board, entry_id: str, user_id: str, name: str) -> None:
        self._board = board
        self._user_id = user_id
        self._attr_unique_id = f"{entry_id}_{user_id}_unread"
        # Yields entity_id binary_sensor.message_board_unread_<name>
        self._attr_name = f"Message Board unread {name}"

    @property
    def is_on(self) -> bool:
        return self.unread_threads > 0

    @property
    def unread_threads(self) -> int:
        return self._board.unread_count(self._user_id)

    @property
    def extra_state_attributes(self) -> dict[str, int]:
        return {"unread_threads": self.unread_threads}

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(self._board.add_listener(self.async_write_ha_state))
