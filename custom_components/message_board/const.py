"""Constants for the Message Board integration."""

DOMAIN = "message_board"

CONF_USERS = "users"

STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1

# Fixed reaction set. Single source of truth: the card receives it via WebSocket.
REACTIONS = ("👍", "❤️", "😂", "😮", "😢", "✅")

MAX_TEXT_LENGTH = 2000

CARD_URL = f"/{DOMAIN}/message-board-card.js"
