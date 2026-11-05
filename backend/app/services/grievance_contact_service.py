"""Single source of truth for the platform's grievance/contact information.

IT (Intermediary) Rules 2021 requires that grievance and contact details be made
available. This content is static (no visitor or personal data involved) so it is
kept as a module-level constant rather than a database table.
"""

GRIEVANCE_CONTACT: dict[str, object] = {
    # `grievance_officer` matches the approved API spec's field name exactly
    # (response: 200 {grievance_officer, email, address}); the SPA reads this key.
    "grievance_officer": "Anjali Nair",
    "email": "grievance@notesboard.in",
    "phone": "+91 80 4000 1234",
    "address": "Notes Board, 3rd Floor, MG Road, Bengaluru 560001, India",
    # Flat keys kept for any caller that reads them directly, and the same values
    # nested under `response_windows` for the SPA, which reads
    # `response_windows.acknowledgement` / `.resolution`.
    "acknowledgement_window": "24 hours",
    "resolution_window": "15 days",
    "response_windows": {"acknowledgement": "24 hours", "resolution": "15 days"},
}


def get_grievance_contact() -> dict[str, object]:
    """Return the platform's grievance officer and contact details.

    Shape: {grievance_officer, email, phone, address, acknowledgement_window,
    resolution_window, response_windows: {acknowledgement, resolution}}. Static
    content; no visitor or personal data involved.
    """
    return dict(GRIEVANCE_CONTACT)
