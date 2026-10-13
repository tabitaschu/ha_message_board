"""Config flow: pick the Home Assistant users that share the board."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.config_entries import ConfigFlow, ConfigFlowResult
from homeassistant.helpers.selector import (
    SelectOptionDict,
    SelectSelector,
    SelectSelectorConfig,
)

from .const import CONF_USERS, DOMAIN

MIN_USERS = 2


class MessageBoardConfigFlow(ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        # Single instance is enforced by "single_config_entry" in manifest.json.
        errors: dict[str, str] = {}
        if user_input is not None:
            if len(user_input[CONF_USERS]) >= MIN_USERS:
                return self.async_create_entry(title="Message Board", data=user_input)
            errors[CONF_USERS] = "too_few_users"

        users = [
            SelectOptionDict(value=user.id, label=user.name or user.id)
            for user in await self.hass.auth.async_get_users()
            if user.is_active and not user.system_generated
        ]
        schema = vol.Schema(
            {
                vol.Required(CONF_USERS): SelectSelector(
                    SelectSelectorConfig(options=users, multiple=True)
                )
            }
        )
        return self.async_show_form(step_id="user", data_schema=schema, errors=errors)
