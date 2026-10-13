"""Constants for the Message Board integration."""

DOMAIN = "message_board"

CONF_USERS = "users"

STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1

# Fixed reaction set. Single source of truth: the card receives it via WebSocket.
REACTIONS = ("👍", "❤️", "😂", "😮", "😢", "✅")

MAX_TEXT_LENGTH = 2000

# Post properties. Ordered lowest -> highest; the card uses this order for sorting.
PRIORITIES = ("info", "low", "normal", "high")
DEFAULT_PRIORITY = "normal"
# New posts with these priorities need attention (see binary_sensor attention_*).
ATTENTION_PRIORITIES = ("normal", "high")
MAX_TITLE_LENGTH = 120
MAX_TAGS = 10
MAX_TAG_LENGTH = 30

CARD_URL = f"/{DOMAIN}/message-board-card.js"
