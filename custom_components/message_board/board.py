"""Domain logic of the message board.

Deliberately free of Home Assistant imports so it can be tested in isolation.
Persistence goes through any object offering ``async_load`` and
``async_delay_save`` (Home Assistant's ``Store`` in production).
"""

from __future__ import annotations

import time
import uuid
from collections.abc import Callable
from typing import Any, Protocol

from .const import (
    ATTENTION_PRIORITIES,
    DEFAULT_PRIORITY,
    MAX_TAG_LENGTH,
    MAX_TAGS,
    MAX_TEXT_LENGTH,
    MAX_TITLE_LENGTH,
    PRIORITIES,
    REACTIONS,
)

Thread = dict[str, Any]
Message = dict[str, Any]

SAVE_DELAY = 1  # seconds; batches rapid changes into one write


class StoreLike(Protocol):
    """Subset of homeassistant.helpers.storage.Store used by the board."""

    async def async_load(self) -> dict[str, Any] | None: ...

    def async_delay_save(
        self, data_func: Callable[[], dict[str, Any]], delay: float = 0
    ) -> None: ...


class BoardError(Exception):
    """Rejected operation. ``code`` is sent to the client as error code."""

    def __init__(self, code: str, message: str) -> None:
        super().__init__(message)
        self.code = code


class Board:
    """Threads between a fixed set of users.

    A thread is a post (title, its first message as body, tags, priority)
    with comments (all further messages). Every thread has one sender and one
    recipient. Inboxes are views: a user's inbox holds the threads whose
    recipient they are.
    """

    def __init__(self, store: StoreLike, users: list[str]) -> None:
        self._store = store
        self.users = users
        self._threads: dict[str, Thread] = {}
        self._listeners: list[Callable[[], None]] = []

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self._threads = {t["id"]: t for t in data.get("threads", [])}
        for thread in self._threads.values():
            _migrate(thread)

    # --- queries -------------------------------------------------------------

    def threads_for(self, user: str) -> list[Thread]:
        """All threads the user takes part in, newest activity first."""
        own = [t for t in self._threads.values() if _participates(t, user)]
        return sorted(own, key=_last_activity, reverse=True)

    def unread_count(self, user: str) -> int:
        return sum(is_unread(t, user) for t in self.threads_for(user))

    def attention_count(self, user: str) -> int:
        return sum(needs_attention(t, user) for t in self.threads_for(user))

    # --- commands ------------------------------------------------------------

    def create_thread(
        self,
        user: str,
        recipient: str,
        title: str,
        text: str = "",
        tags: list[str] | None = None,
        priority: str = DEFAULT_PRIORITY,
    ) -> Thread:
        self._require_user(user)
        self._require_user(recipient)
        if recipient == user:
            raise BoardError("invalid_recipient", "Cannot post to your own inbox")
        message = _new_message(user, text, required=False)
        thread: Thread = {
            "id": uuid.uuid4().hex,
            "sender": user,
            "recipient": recipient,
            "archived": False,
            "title": _clean_title(title),
            "tags": _clean_tags(tags or []),
            "priority": _check_priority(priority),
            "messages": [message],
            "last_read": {user: message["created"]},
        }
        self._threads[thread["id"]] = thread
        self._changed()
        return thread

    def reply(self, user: str, thread_id: str, text: str) -> None:
        thread = self._thread(user, thread_id)
        message = _new_message(user, text)
        thread["messages"].append(message)
        thread["archived"] = False  # new activity resurfaces the thread
        thread["last_read"][user] = message["created"]
        self._changed()

    def edit_comment(self, user: str, thread_id: str, message_id: str, text: str) -> None:
        """Edit own comment. Intentionally does not affect read state.

        The post body is edited through update_post, together with the title.
        """
        thread = self._thread(user, thread_id)
        message = self._message(user, thread_id, message_id)
        if message is thread["messages"][0]:
            raise BoardError("invalid_message", "Use update to edit the post")
        _require_author(message, user)
        message["text"] = _clean_text(text)
        message["edited"] = time.time()
        self._changed()

    def toggle_reaction(self, user: str, thread_id: str, message_id: str, emoji: str) -> None:
        """Add or remove the user's reaction. Does not affect read state."""
        if emoji not in REACTIONS:
            raise BoardError("invalid_reaction", f"Unsupported reaction: {emoji}")
        reactions: dict[str, list[str]] = self._message(user, thread_id, message_id)["reactions"]
        reactors = reactions.setdefault(emoji, [])
        if user in reactors:
            reactors.remove(user)
            if not reactors:
                del reactions[emoji]
        else:
            reactors.append(user)
        self._changed()

    def update_post(
        self,
        user: str,
        thread_id: str,
        title: str | None = None,
        text: str | None = None,
        tags: list[str] | None = None,
        priority: str | None = None,
    ) -> None:
        """Change the post. Title and body: author only; tags and priority: both.

        No read-state effect. Arguments left at None stay unchanged.
        """
        thread = self._thread(user, thread_id)
        post = thread["messages"][0]
        if title is not None or text is not None:
            _require_author(post, user)
        if title is not None:
            thread["title"] = _clean_title(title)
        if text is not None:
            post["text"] = _clean_text(text, required=False)
        if title is not None or text is not None:
            post["edited"] = time.time()
        if tags is not None:
            thread["tags"] = _clean_tags(tags)
        if priority is not None:
            thread["priority"] = _check_priority(priority)
        self._changed()

    def delete_thread(self, user: str, thread_id: str) -> None:
        """Remove a post with all comments. Allowed for both participants."""
        del self._threads[self._thread(user, thread_id)["id"]]
        self._changed()

    def set_archived(self, user: str, thread_id: str, archived: bool) -> None:
        self._thread(user, thread_id)["archived"] = archived
        self._changed()

    def mark_read(self, user: str, thread_id: str) -> None:
        thread = self._thread(user, thread_id)
        if not is_unread(thread, user):
            return  # avoid needless writes and broadcasts
        thread["last_read"][user] = time.time()
        self._changed()

    # --- change notification -------------------------------------------------

    def add_listener(self, listener: Callable[[], None]) -> Callable[[], None]:
        """Register a change listener. Returns a function that removes it."""
        self._listeners.append(listener)
        return lambda: self._listeners.remove(listener)

    def _changed(self) -> None:
        self._store.async_delay_save(self._data_to_save, SAVE_DELAY)
        for listener in list(self._listeners):
            listener()

    def _data_to_save(self) -> dict[str, Any]:
        return {"threads": list(self._threads.values())}

    # --- lookups with access control -----------------------------------------

    def _require_user(self, user: str) -> None:
        if user not in self.users:
            raise BoardError("unauthorized", "User is not a board member")

    def _thread(self, user: str, thread_id: str) -> Thread:
        thread = self._threads.get(thread_id)
        if thread is None or not _participates(thread, user):
            raise BoardError("not_found", "Thread not found")
        return thread

    def _message(self, user: str, thread_id: str, message_id: str) -> Message:
        thread = self._thread(user, thread_id)
        for message in thread["messages"]:
            if message["id"] == message_id:
                return message
        raise BoardError("not_found", "Message not found")


def is_unread(thread: Thread, user: str) -> bool:
    """True if someone else wrote in the thread since the user last read it.

    Archived threads never count; a reply un-archives them.
    """
    if thread["archived"]:
        return False
    last_read = thread["last_read"].get(user, 0)
    return any(m["author"] != user and m["created"] > last_read for m in thread["messages"])


def needs_attention(thread: Thread, user: str) -> bool:
    """True for an unread new post to the user whose priority asks for attention.

    Comments never count: only the post itself does.
    """
    return (
        not thread["archived"]
        and thread["recipient"] == user
        and thread["priority"] in ATTENTION_PRIORITIES
        and thread["messages"][0]["created"] > thread["last_read"].get(user, 0)
    )


def _participates(thread: Thread, user: str) -> bool:
    return user in (thread["sender"], thread["recipient"])


def _last_activity(thread: Thread) -> float:
    return thread["messages"][-1]["created"]


def _require_author(message: Message, user: str) -> None:
    if message["author"] != user:
        raise BoardError("unauthorized", "Only the author can edit this")


def _new_message(author: str, text: str, *, required: bool = True) -> Message:
    return {
        "id": uuid.uuid4().hex,
        "author": author,
        "text": _clean_text(text, required=required),
        "created": time.time(),
        "edited": None,
        "reactions": {},
    }


def _clean_text(text: str, *, required: bool = True) -> str:
    text = text.strip()
    if required and not text:
        raise BoardError("invalid_text", "Message must not be empty")
    if len(text) > MAX_TEXT_LENGTH:
        raise BoardError("invalid_text", f"Max. {MAX_TEXT_LENGTH} characters")
    return text


def _clean_tags(tags: list[str]) -> list[str]:
    """Trim, drop empties and case-insensitive duplicates, keep order."""
    cleaned: dict[str, str] = {}
    for tag in tags:
        tag = tag.strip()
        if not tag:
            continue
        if len(tag) > MAX_TAG_LENGTH:
            raise BoardError("invalid_tags", f"Max. {MAX_TAG_LENGTH} characters per tag")
        cleaned.setdefault(tag.casefold(), tag)
    if len(cleaned) > MAX_TAGS:
        raise BoardError("invalid_tags", f"Max. {MAX_TAGS} tags")
    return list(cleaned.values())


def _check_priority(priority: str) -> str:
    if priority not in PRIORITIES:
        raise BoardError("invalid_priority", f"Unknown priority: {priority}")
    return priority


def _clean_title(title: str) -> str:
    title = " ".join(title.split())  # single line
    if not title:
        raise BoardError("invalid_title", "Title must not be empty")
    if len(title) > MAX_TITLE_LENGTH:
        raise BoardError("invalid_title", f"Max. {MAX_TITLE_LENGTH} characters")
    return title


def _migrate(thread: Thread) -> None:
    """Bring threads stored by older versions to the current shape."""
    thread.setdefault("tags", [])
    thread.setdefault("priority", DEFAULT_PRIORITY)
    if "title" not in thread:  # before titles: first line of the post becomes the title
        post = thread["messages"][0]
        first, _, rest = post["text"].partition("\n")
        thread["title"] = first.strip()[:MAX_TITLE_LENGTH] or "(ohne Titel)"
        post["text"] = rest.strip()
