"""SQLAlchemy models.

One table, matching the approved data model: `notes`, the single board every visitor
shares and edits wiki-style. `Base` is already bound to the engine and `app/__init__.py`
imports this module before it creates the schema.
"""

from datetime import datetime

from sqlalchemy import BigInteger, Boolean, DateTime, Integer, String, Text, false, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

# SQLite only treats a column typed exactly INTEGER as the rowid alias it auto-increments;
# BIGINT there is just a NOT NULL column with no default, so every local insert would fail.
# The variant keeps BIGSERIAL on Postgres (the data model's bigserial) and falls back to
# SQLite's own autoincrementing INTEGER for the local default database.
_id_type = BigInteger().with_variant(Integer, "sqlite")


class Note(Base):
    """A single note on the shared board. Any row may be read, edited or deleted by anyone."""

    __tablename__ = "notes"

    id: Mapped[int] = mapped_column(_id_type, primary_key=True, autoincrement=True)
    title: Mapped[str | None] = mapped_column(String(200), nullable=True)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    # A plain string "false" default stores the literal text on SQLite, which Python then
    # reads back as a truthy non-empty string; the SQL expression compiles correctly for
    # every dialect this app targets (SQLite locally, Postgres in every other environment).
    reported: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=false())
    report_count: Mapped[int] = mapped_column(Integer, nullable=False, server_default="0")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )


__all__ = ["Base", "Note"]
