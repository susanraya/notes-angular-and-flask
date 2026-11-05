"""Business logic for the shared notes board."""

from app.database import SessionLocal
from app.models import Note


def _serialize(note: Note) -> dict[str, object]:
    return {
        "id": note.id,
        "title": note.title,
        "body": note.body,
        "reported": note.reported,
        "report_count": note.report_count,
        "created_at": note.created_at.isoformat(),
        "updated_at": note.updated_at.isoformat() if note.updated_at else None,
    }


def list_notes() -> list[dict[str, object]]:
    """All notes, newest first."""
    with SessionLocal() as session:
        notes = session.query(Note).order_by(Note.created_at.desc(), Note.id.desc()).all()
        return [_serialize(note) for note in notes]


def create_note(payload: object) -> tuple[dict[str, object] | None, str | None]:
    """Create a note from a request body. Returns (note, None) or (None, error message).

    Only `title` and `body` are read; any other field the caller sends is ignored and
    never persisted. `title` is optional; `body` must be non-empty once stripped.
    """
    if not isinstance(payload, dict):
        return None, "body is required"

    raw_body = payload.get("body")
    if not isinstance(raw_body, str) or not raw_body.strip():
        return None, "body is required"

    raw_title = payload.get("title")
    title: str | None = None
    if isinstance(raw_title, str) and raw_title.strip():
        title = raw_title

    with SessionLocal() as session:
        note = Note(title=title, body=raw_body)
        session.add(note)
        session.commit()
        session.refresh(note)
        return _serialize(note), None
