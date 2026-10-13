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


def test_edit_and_reaction_do_not_mark_unread(board: Board) -> None:
    with freeze_time("2026-01-01 10:00"):
        t = board.create_thread(A, B, "Tippfeler")
        board.mark_read(B, t["id"])
    msg_id = t["messages"][0]["id"]
    with freeze_time("2026-01-01 11:00"):
        board.edit(A, t["id"], msg_id, "Tippfehler")
        board.toggle_reaction(A, t["id"], msg_id, "👍")
    assert board.unread_count(B) == 0
    message = thread_of(board, B)["messages"][0]
    assert message["text"] == "Tippfehler"
    assert message["edited"] is not None


def test_only_author_can_edit(board: Board) -> None:
    t = board.create_thread(A, B, "Hi")
    with pytest.raises(BoardError, match="author"):
        board.edit(B, t["id"], t["messages"][0]["id"], "gehackt")


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
    first.create_thread(A, B, "bleibt")
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
