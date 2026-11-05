"""Views for Angular Notes Board SPA.

Renders the single shared board, provides create/edit/delete forms with validation, a
report action with acknowledgement, a delete confirmation step, an empty-state message,
and surfaces grievance/contact information. Reloads data on page refresh.

Every view is a stub returning a placeholder. The shape comes from the approved
API spec; the behaviour does not exist yet.
"""

from flask import Blueprint, Response, jsonify, request

from app.services.notes_service import (
    create_note,
    delete_note,
    list_notes,
    report_note,
    update_note,
)

bp = Blueprint("web_spa", __name__)


@bp.route("/api/notes", methods=["GET"])
def get_api_notes() -> Response:
    """List all notes on the shared board; empty array when none exist."""
    return jsonify(list_notes())


@bp.route("/api/notes", methods=["POST"])
def post_api_notes() -> tuple[Response, int]:
    """Create a note; body required, title optional; stores plain text only."""
    payload = request.get_json(silent=True)
    note, error = create_note(payload)
    if error is not None:
        return jsonify({"message": error}), 400
    return jsonify(note), 201


@bp.route("/api/notes/<id>", methods=["PUT"])
def put_api_notes_by_id(id: str) -> tuple[Response, int]:
    """Edit any note wiki-style; body required; no version history kept."""
    payload = request.get_json(silent=True)
    note, error = update_note(id, payload)
    if error == "not_found":
        return jsonify({"message": "note not found"}), 404
    if error is not None:
        return jsonify({"message": error}), 400
    return jsonify(note), 200


@bp.route("/api/notes/<id>", methods=["DELETE"])
def delete_api_notes_by_id(id: str) -> tuple[Response, int]:
    """Permanently delete any note (also used to remove reported notes)."""
    deleted = delete_note(id)
    if not deleted:
        return jsonify({"message": "note not found"}), 404
    return jsonify({}), 204


@bp.route("/api/notes/<id>/report", methods=["POST"])
def post_api_notes_by_id_report(id: str) -> tuple[Response, int]:
    """Report a note as objectionable; sets reported flag; no personal data required."""
    note = report_note(id)
    if note is None:
        return jsonify({"message": "note not found"}), 404
    return jsonify(note), 200
