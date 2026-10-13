"""Unit tests for the board's domain logic (no Home Assistant needed)."""

from __future__ import annotations

import pytest
from freezegun import freeze_time

from custom_components.message_board.board import Board, BoardError, is_unread

A, B, OUTSIDER = "alice", "bob", "mallory"


class FakeStore:
    def __init__(self, data=None):
        self.data = data
        self.saves = 0

    async def async_load(self):
        return self.data

    def async_delay_save(self, data_func, delay=0):
        self.data = data_func()
        self.saves += 1


@pytest.fixture
def board() -> Board:
    return Board(FakeStore(), [A, B])


def thread_of(board: Board, user: str):
    (thread,) = board.threads_for(user)
    return thread


def test_own_post_is_not_unread_for_sender(board: Board) -> None:
    board.create_thread(A, B, "Müll rausbringen?")
    assert board.unread_count(A) == 0
    assert board.unread_count(B) == 1


def test_reply_marks_unread_for_other_side_only(board: Board) -> None:
    with freeze_time("2026-01-01 10:00"):
        t = board.create_thread(A, B, "Frage")
        board.mark_read(B, t["id"])
    with freeze_time("2026-01-01 10:05"):
        board.reply(B, t["id"], "Antwort")
    assert board.unread_count(A) == 1
    assert board.unread_count(B) == 0


def test_mark_read(board: Board) -> None:
    t = board.create_thread(A, B, "Hi")
    board.mark_read(B, t["id"])
    assert board.unread_count(B) == 0


def test_edits_and_reactions_do_not_mark_unread(board: Board) -> None:
    with freeze_time("2026-01-01 10:00"):
        t = board.create_thread(A, B, "Tippfeler", "Text")
        board.reply(A, t["id"], "Komentar")
        board.mark_read(B, t["id"])
    post_id, comment_id = (m["id"] for m in t["messages"])
    with freeze_time("2026-01-01 11:00"):
        board.update_post(A, t["id"], title="Tippfehler", text="")
        board.edit_comment(A, t["id"], comment_id, "Kommentar")
        board.toggle_reaction(A, t["id"], post_id, "👍")
    assert board.unread_count(B) == board.attention_count(B) == 0
    assert t["title"] == "Tippfehler"
    assert t["messages"][0]["text"] == ""  # post body is optional
    assert t["messages"][1]["text"] == "Kommentar"
    assert all(m["edited"] for m in t["messages"])


def test_only_author_can_edit_title_text_and_comments(board: Board) -> None:
    t = board.create_thread(A, B, "Hi")
    board.reply(A, t["id"], "Kommentar")
    with pytest.raises(BoardError, match="author"):
        board.update_post(B, t["id"], title="gehackt")
    with pytest.raises(BoardError, match="author"):
        board.update_post(B, t["id"], text="gehackt")
    with pytest.raises(BoardError, match="author"):
        board.edit_comment(B, t["id"], t["messages"][1]["id"], "gehackt")


def test_post_body_not_editable_as_comment(board: Board) -> None:
    t = board.create_thread(A, B, "Hi")
    with pytest.raises(BoardError):
        board.edit_comment(A, t["id"], t["messages"][0]["id"], "x")


@pytest.mark.parametrize(
    ("priority", "expected"), [("info", 0), ("low", 0), ("normal", 1), ("high", 1)]
)
def test_attention_only_for_new_important_posts(board: Board, priority, expected) -> None:
    board.create_thread(A, B, "Post", priority=priority)
    assert board.attention_count(B) == expected
    assert board.attention_count(A) == 0  # never for the sender


def test_comments_never_need_attention(board: Board) -> None:
    with freeze_time("2026-01-01 10:00"):
        t = board.create_thread(A, B, "Post", priority="high")
        board.mark_read(B, t["id"])
    with freeze_time("2026-01-01 11:00"):
        board.reply(A, t["id"], "Nachtrag")  # comment to B
    with freeze_time("2026-01-01 11:01"):
        board.reply(B, t["id"], "Antwort")  # comment to A (sender)
    assert board.unread_count(A) == 1
    assert board.attention_count(A) == board.attention_count(B) == 0


def test_reaction_toggles(board: Board) -> None:
    t = board.create_thread(A, B, "Hi")
    msg_id = t["messages"][0]["id"]
    board.toggle_reaction(B, t["id"], msg_id, "❤️")
    assert t["messages"][0]["reactions"] == {"❤️": [B]}
    board.toggle_reaction(B, t["id"], msg_id, "❤️")
    assert t["messages"][0]["reactions"] == {}


def test_unknown_reaction_rejected(board: Board) -> None:
    t = board.create_thread(A, B, "Hi")
    with pytest.raises(BoardError):
        board.toggle_reaction(B, t["id"], t["messages"][0]["id"], "🦄")


def test_both_can_archive_and_reply_unarchives(board: Board) -> None:
    t = board.create_thread(A, B, "Hi")
    board.set_archived(B, t["id"], True)
    assert not is_unread(t, B)  # archived threads never count
    board.set_archived(A, t["id"], False)
    board.set_archived(A, t["id"], True)
    board.reply(A, t["id"], "Doch noch was")
    assert t["archived"] is False


def test_outsider_has_no_access(board: Board) -> None:
    t = board.create_thread(A, B, "privat")
    assert board.threads_for(OUTSIDER) == []
    with pytest.raises(BoardError, match="not found"):
        board.reply(OUTSIDER, t["id"], "hallo")
    with pytest.raises(BoardError):
        board.create_thread(OUTSIDER, A, "hallo")


@pytest.mark.parametrize("text", ["", "   ", "x" * 2001])
def test_invalid_text_rejected(board: Board, text: str) -> None:
    with pytest.raises(BoardError):
        board.create_thread(A, B, text)


def test_cannot_post_to_own_inbox(board: Board) -> None:
    with pytest.raises(BoardError):
        board.create_thread(A, A, "Notiz an mich")


async def test_persistence_roundtrip() -> None:
    store = FakeStore()
    first = Board(store, [A, B])
    first.create_thread(A, B, "Titel", "bleibt")
    second = Board(store, [A, B])
    await second.async_load()
    assert thread_of(second, B)["messages"][0]["text"] == "bleibt"


def test_listeners_notified_and_removable(board: Board) -> None:
    calls = []
    remove = board.add_listener(lambda: calls.append(1))
    board.create_thread(A, B, "1")
    remove()
    board.create_thread(A, B, "2")
    assert calls == [1]


def test_post_properties_on_create(board: Board) -> None:
    t = board.create_thread(
        A, B, "Einkauf", tags=[" Haushalt ", "haushalt", "Einkauf", ""], priority="high"
    )
    assert t["tags"] == ["Haushalt", "Einkauf"]  # trimmed, case-insensitive dedupe
    assert t["priority"] == "high"


def test_defaults(board: Board) -> None:
    t = board.create_thread(A, B, "Hi")
    assert t["tags"] == [] and t["priority"] == "normal"


def test_both_can_update_post_without_unread(board: Board) -> None:
    with freeze_time("2026-01-01 10:00"):
        t = board.create_thread(A, B, "Hi")
        board.mark_read(B, t["id"])
    with freeze_time("2026-01-01 11:00"):
        board.update_post(B, t["id"], tags=["Garten"])
        board.update_post(A, t["id"], priority="low")
    assert t["tags"] == ["Garten"] and t["priority"] == "low"
    assert board.unread_count(A) == board.unread_count(B) == 0


@pytest.mark.parametrize(
    ("tags", "priority"),
    [(["x" * 31], None), ([f"t{i}" for i in range(11)], None), (None, "urgent")],
)
def test_invalid_post_properties_rejected(board: Board, tags, priority) -> None:
    t = board.create_thread(A, B, "Hi")
    with pytest.raises(BoardError):
        board.update_post(A, t["id"], tags=tags, priority=priority)


@pytest.mark.parametrize("deleter", [A, B])
def test_both_can_delete(board: Board, deleter: str) -> None:
    t = board.create_thread(A, B, "weg damit")
    board.delete_thread(deleter, t["id"])
    assert board.threads_for(A) == board.threads_for(B) == []


def test_outsider_cannot_update_or_delete(board: Board) -> None:
    t = board.create_thread(A, B, "Hi")
    with pytest.raises(BoardError):
        board.update_post(OUTSIDER, t["id"], priority="high")
    with pytest.raises(BoardError):
        board.delete_thread(OUTSIDER, t["id"])


async def test_old_data_is_migrated() -> None:
    old = {
        "threads": [
            {
                "id": "t",
                "sender": A,
                "recipient": B,
                "archived": False,
                "last_read": {},
                "messages": [{"id": "m", "author": A, "text": "Erste Zeile\nRest", "created": 1}],
            }
        ]
    }
    board = Board(FakeStore(old), [A, B])
    await board.async_load()
    thread = board._threads["t"]
    assert thread["tags"] == [] and thread["priority"] == "normal"
    assert thread["title"] == "Erste Zeile"  # first line becomes the title
    assert thread["messages"][0]["text"] == "Rest"
