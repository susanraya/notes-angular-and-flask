"""Single source of truth for the platform's grievance/contact information.

IT (Intermediary) Rules 2021 requires that grievance and contact details be made
available. This content is static (no visitor or personal data involved) so it is
kept as a module-level constant rather than a database table.
"""

GRIEVANCE_CONTACT: dict[str, object] = {
    "officer_name": "Anjali Nair",
    "email": "grievance@notesboard.in",
    "phone": "+91 80 4000 1234",
    "address": "Notes Board, 3rd Floor, MG Road, Bengaluru 560001, India",
    "acknowledgement_window": "24 hours",
    "resolution_window": "15 days",
}


def get_grievance_contact() -> dict[str, object]:
    """Return the platform's grievance officer and contact details.

    Shape: {officer_name, email, phone, address, acknowledgement_window,
    resolution_window}. Static content; no visitor or personal data involved.
    """
    return dict(GRIEVANCE_CONTACT)
