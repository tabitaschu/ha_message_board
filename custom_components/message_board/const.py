"""Constants for the Message Board integration."""

DOMAIN = "message_board"

CONF_USERS = "users"

STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1

# Fixed reaction set. Single source of truth: the card receives it via WebSocket.
REACTIONS = ("👍", "❤️", "😂", "😮", "😢", "✅")

MAX_TEXT_LENGTH = 2000

# Post properties. Ordered low -> high; the card uses this order for sorting.
PRIORITIES = ("low", "normal", "high")
DEFAULT_PRIORITY = "normal"
MAX_TAGS = 10
MAX_TAG_LENGTH = 30

CARD_URL = f"/{DOMAIN}/message-board-card.js"
