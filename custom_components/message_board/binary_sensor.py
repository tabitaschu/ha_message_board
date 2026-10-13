"""Binary sensors per board member: 'unread' and 'attention'.

They are the board's only outward interface: whatever should react
(lights, notifications, dashboards) consumes these entities.
- unread:    any thread with something the member has not read yet
- attention: unread new posts whose priority asks for attention
             (comments never count; see board.needs_attention)
"""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass

from homeassistant.components.binary_sensor import BinarySensorEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import MessageBoardConfigEntry
from .board import Board


@dataclass(frozen=True)
class SensorKind:
    key: str  # part of entity_id and unique_id
    icon: str
    count: Callable[[Board, str], int]


KINDS = (
    SensorKind("unread", "mdi:email-alert", Board.unread_count),
    SensorKind("attention", "mdi:bell-ring", Board.attention_count),
)


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
        entities += [BoardSensor(board, kind, entry.entry_id, user_id, name) for kind in KINDS]
    async_add_entities(entities)


class BoardSensor(BinarySensorEntity):
    """On while the member has at least one matching thread."""

    _attr_should_poll = False

    def __init__(
        self, board: Board, kind: SensorKind, entry_id: str, user_id: str, name: str
    ) -> None:
        self._board = board
        self._kind = kind
        self._user_id = user_id
        self._attr_icon = kind.icon
        self._attr_unique_id = f"{entry_id}_{user_id}_{kind.key}"
        # Yields entity_id binary_sensor.message_board_<key>_<name>
        self._attr_name = f"Message Board {kind.key} {name}"

    @property
    def is_on(self) -> bool:
        return self.threads > 0

    @property
    def threads(self) -> int:
        return self._kind.count(self._board, self._user_id)

    @property
    def extra_state_attributes(self) -> dict[str, int]:
        return {"threads": self.threads}

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(self._board.add_listener(self.async_write_ha_state))
