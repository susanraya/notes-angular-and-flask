"""Views for Angular Notes Board SPA.

Renders the single shared board, provides create/edit/delete forms with validation, a
report action with acknowledgement, a delete confirmation step, an empty-state message,
and surfaces grievance/contact information. Reloads data on page refresh.

Every view is a stub returning a placeholder. The shape comes from the approved
API spec; the behaviour does not exist yet.
"""

from flask import Blueprint

from app.stubs import not_implemented

bp = Blueprint("web_spa", __name__)


@bp.route("/api/notes", methods=["GET"])
def get_api_notes() -> dict[str, str]:
    """List all notes on the shared board; empty array when none exist."""
    return not_implemented("GET /api/notes")


@bp.route("/api/notes", methods=["POST"])
def post_api_notes() -> dict[str, str]:
    """Create a note; body required, title optional; stores plain text only."""
    return not_implemented("POST /api/notes")


@bp.route("/api/notes/<id>", methods=["PUT"])
def put_api_notes_by_id(id: str) -> dict[str, str]:
    """Edit any note wiki-style; body required; no version history kept."""
    return not_implemented("PUT /api/notes/{id}")


@bp.route("/api/notes/<id>", methods=["DELETE"])
def delete_api_notes_by_id(id: str) -> dict[str, str]:
    """Permanently delete any note (also used to remove reported notes)."""
    return not_implemented("DELETE /api/notes/{id}")


@bp.route("/api/notes/<id>/report", methods=["POST"])
def post_api_notes_by_id_report(id: str) -> dict[str, str]:
    """Report a note as objectionable; sets reported flag; no personal data required."""
    return not_implemented("POST /api/notes/{id}/report")
