"""Views for API.

Endpoints the approved API spec declares without naming a component that owns them.
"""

from flask import Blueprint, Response, jsonify

from app.services.grievance_contact_service import get_grievance_contact

bp = Blueprint("api", __name__)


@bp.route("/api/grievance-contact", methods=["GET"])
def get_api_grievance_contact() -> Response:
    """Return platform grievance/contact information for IT (Intermediary) Rules 2021 compliance.

    Public, no auth, no request body. Response shape:
    {officer_name, email, phone, address, acknowledgement_window, resolution_window}.
    """
    return jsonify(get_grievance_contact())
