"""Tests for the TaskStore."""

from todoapp.models import Priority
from todoapp.store import TaskStore


def test_add_and_get():
    store = TaskStore()
    task = store.add("write docs", Priority.HIGH)
    assert task.id == 1
    assert store.get(1) is task
    assert task.priority is Priority.HIGH


def test_complete():
    store = TaskStore()
    store.add("ship feature")
    assert store.complete(1) is True
    assert store.get(1).done is True
    assert store.complete(999) is False


def test_list_excludes_done():
    store = TaskStore()
    store.add("a")
    store.add("b")
    store.complete(1)
    open_tasks = store.list_tasks(include_done=False)
    assert [t.id for t in open_tasks] == [2]


def test_count_open():
    store = TaskStore()
    store.add("a")
    store.add("b")
    assert store.count_open() == 2
    store.complete(1)
    assert store.count_open() == 1


def test_remove():
    store = TaskStore()
    store.add("temp")
    assert store.remove(1) is True
    assert store.remove(1) is False
