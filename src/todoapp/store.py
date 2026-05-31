"""In-memory storage for tasks."""

from __future__ import annotations

from .models import Priority, Task


class TaskStore:
    """Holds tasks and provides basic operations."""

    def __init__(self) -> None:
        self._tasks: dict[int, Task] = {}
        self._next_id: int = 1

    def add(self, title: str, priority: Priority = Priority.MEDIUM) -> Task:
        """Create a new task and store it."""
        task = Task(id=self._next_id, title=title, priority=priority)
        self._tasks[task.id] = task
        self._next_id += 1
        return task

    def get(self, task_id: int) -> Task | None:
        """Return a task by id, or None if missing."""
        return self._tasks.get(task_id)

    def list_tasks(self, include_done: bool = True) -> list[Task]:
        """Return all tasks, optionally hiding completed ones."""
        tasks = list(self._tasks.values())
        if not include_done:
            tasks = [t for t in tasks if not t.done]
        return sorted(tasks, key=lambda t: t.id)

    def complete(self, task_id: int) -> bool:
        """Mark a task done. Returns True if the task existed."""
        task = self._tasks.get(task_id)
        if task is None:
            return False
        task.mark_done()
        return True

    def remove(self, task_id: int) -> bool:
        """Delete a task. Returns True if the task existed."""
        return self._tasks.pop(task_id, None) is not None
