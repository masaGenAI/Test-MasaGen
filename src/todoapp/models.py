"""Data models for the TODO application."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum


class Priority(Enum):
    """Priority level of a task."""

    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


@dataclass
class Task:
    """A single TODO task."""

    id: int
    title: str
    priority: Priority = Priority.MEDIUM
    done: bool = False
    created_at: datetime = field(default_factory=datetime.now)

    def mark_done(self) -> None:
        """Mark this task as completed."""
        self.done = True
