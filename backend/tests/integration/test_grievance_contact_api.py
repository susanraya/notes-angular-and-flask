"""Integration tests for GET /api/grievance-contact, exercised through the app's test client.

The endpoint's exact field names are not yet fixed by a schema (only the API spec's
free-text description: "200 {grievance_officer, email, address}"), so these tests accept
any reasonably-named key for each required piece of information rather than requiring one
exact shape. What they do require is that each of: an officer identity, an email, a phone
number, a postal address, and a response-window (acknowledgement/resolution time) is
present and non-empty in the 200 response.
"""

import re

from app import create_app

app = create_app()
client = app.test_client()

EMAIL_RE = re.compile(r"[^@\s]+@[^@\s]+\.[^@\s]+")

OFFICER_KEYS = {"officer_name", "officer", "name", "grievance_officer", "grievanceOfficer"}
EMAIL_KEYS = {"email", "officer_email", "contact_email", "grievance_email"}
PHONE_KEYS = {"phone", "officer_phone", "contact_phone", "telephone"}
ADDRESS_KEYS = {"address", "postal_address", "office_address"}
RESPONSE_WINDOW_KEYS = {
    "response_window",
    "responseWindow",
    "acknowledgement_hours",
    "acknowledgement_window",
    "ack_hours",
    "resolution_days",
    "resolution_window",
    "sla",
}


def _first_present(data: dict, candidate_keys: set[str]):
    for key in candidate_keys:
        if key in data:
            return key, data[key]
    return None, None


def test_ac019_get_grievance_contact_returns_200_with_required_fields_populated() -> None:
    response = client.get("/api/grievance-contact")

    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, dict)

    officer_key, officer_value = _first_present(data, OFFICER_KEYS)
    assert officer_key is not None, f"no officer-name field found among {OFFICER_KEYS}; got keys {list(data)}"
    assert isinstance(officer_value, str) and officer_value.strip()

    email_key, email_value = _first_present(data, EMAIL_KEYS)
    assert email_key is not None, f"no email field found among {EMAIL_KEYS}; got keys {list(data)}"
    assert isinstance(email_value, str) and EMAIL_RE.search(email_value)

    phone_key, phone_value = _first_present(data, PHONE_KEYS)
    assert phone_key is not None, f"no phone field found among {PHONE_KEYS}; got keys {list(data)}"
    assert isinstance(phone_value, str) and phone_value.strip()

    address_key, address_value = _first_present(data, ADDRESS_KEYS)
    assert address_key is not None, f"no address field found among {ADDRESS_KEYS}; got keys {list(data)}"
    assert isinstance(address_value, str) and address_value.strip()

    window_key, window_value = _first_present(data, RESPONSE_WINDOW_KEYS)
    assert window_key is not None, f"no response-window field found among {RESPONSE_WINDOW_KEYS}; got keys {list(data)}"
    assert window_value not in (None, "", [])


def test_nfr001_no_auth_header_required_and_response_carries_no_caller_personal_data() -> None:
    # The request itself carries no Authorization header, query string or body: nothing
    # that could identify the caller is sent, and the endpoint still succeeds.
    assert "Authorization" not in client.environ_base

    response = client.get("/api/grievance-contact", headers={})

    assert response.status_code == 200
    data = response.get_json()
    # The response describes the platform's own grievance officer, not the caller: it must
    # not echo back anything caller-identifying (no IP, session, cookie or visitor fields).
    caller_identifying_fields = {
        "ip",
        "ip_address",
        "visitor_email",
        "visitor_id",
        "session_id",
        "user_id",
        "cookie",
        "requester",
    }
    assert caller_identifying_fields.isdisjoint(data.keys())
