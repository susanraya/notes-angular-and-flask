"""Integration tests for the edges the existing suite leaves uncovered:

- the title length limit the data model imposes (`varchar(200)`), which the service
  enforces in `notes_service._extract_title_body` but no test exercised,
- titles with surrounding whitespace, which the service strips before storing,
- a request body that is not a JSON object at all (malformed input a browser never
  sends but a client could),
- an id that is not a number, on every mutating endpoint, which must come back as a
  clean 404 rather than an unhandled 500, and
- that the SPA's cross-origin calls are actually allowed, since the frontend and this
  API are always on different origins once deployed (app/__init__.py's CORS setup).

Exercised through the app's test client, same pattern as the sibling integration tests.
"""

import os

from sqlalchemy import text

from app import create_app
from app.database import engine
from app.services.notes_service import TITLE_MAX_LENGTH

app = create_app()
client = app.test_client()


def setup_function() -> None:
    with engine.begin() as conn:
        conn.execute(text("DELETE FROM notes"))


def _create(title: str | None = "t", body: str = "original") -> dict:
    payload = {"body": body}
    if title is not None:
        payload["title"] = title
    return client.post("/api/notes", json=payload).get_json()


def test_post_title_at_the_max_length_is_accepted() -> None:
    title = "x" * TITLE_MAX_LENGTH

    response = client.post("/api/notes", json={"title": title, "body": "fits"})

    assert response.status_code == 201
    assert response.get_json()["title"] == title


def test_post_title_over_the_max_length_returns_400_and_creates_nothing() -> None:
    before = len(client.get("/api/notes").get_json())
    title = "x" * (TITLE_MAX_LENGTH + 1)

    response = client.post("/api/notes", json={"title": title, "body": "too long"})

    assert response.status_code == 400
    assert "title" in response.get_json()["message"].lower()
    after = len(client.get("/api/notes").get_json())
    assert after == before


def test_put_title_over_the_max_length_returns_400_and_leaves_the_note_unchanged() -> None:
    created = _create(title="short", body="body")
    title = "x" * (TITLE_MAX_LENGTH + 1)

    response = client.put(f"/api/notes/{created['id']}", json={"title": title, "body": "new body"})

    assert response.status_code == 400
    unchanged = next(n for n in client.get("/api/notes").get_json() if n["id"] == created["id"])
    assert unchanged["title"] == "short"
    assert unchanged["body"] == "body"


def test_post_title_with_surrounding_whitespace_is_stored_trimmed() -> None:
    response = client.post("/api/notes", json={"title": "  Padded title  ", "body": "x"})

    assert response.status_code == 201
    assert response.get_json()["title"] == "Padded title"


def test_post_with_non_object_json_body_returns_400_rather_than_500() -> None:
    response = client.post("/api/notes", json=["not", "an", "object"])

    assert response.status_code == 400
    assert "message" in response.get_json()


def test_post_with_non_json_payload_returns_400_rather_than_500() -> None:
    response = client.post(
        "/api/notes", data="title=x&body=y", content_type="application/x-www-form-urlencoded"
    )

    assert response.status_code == 400
    assert "message" in response.get_json()


def test_put_with_non_numeric_id_returns_404_not_500() -> None:
    response = client.put("/api/notes/not-a-number", json={"body": "x"})

    assert response.status_code == 404
    assert "message" in response.get_json()


def test_delete_with_non_numeric_id_returns_404_not_500() -> None:
    response = client.delete("/api/notes/not-a-number")

    assert response.status_code == 404
    assert "message" in response.get_json()


def test_report_with_non_numeric_id_returns_404_not_500() -> None:
    response = client.post("/api/notes/not-a-number/report")

    assert response.status_code == 404
    assert "message" in response.get_json()


def test_delete_responds_exactly_204_with_an_empty_body() -> None:
    # The api_spec promises "204 No Content" exactly (not 200), and a 204 must carry no
    # body at all (RFC 9110 15.3.5) -- important for any client that checks the status
    # strictly or tries to parse a response body on every call.
    created = _create(body="to delete")

    response = client.delete(f"/api/notes/{created['id']}")

    assert response.status_code == 204
    assert response.data == b""


def test_cors_allows_the_configured_frontend_origin() -> None:
    # The SPA always runs on a different origin than this API (see app/__init__.py); a
    # browser enforces CORS, so a response missing this header silently breaks the
    # deployed frontend even though every other test here -- made with no Origin header
    # at all -- would keep passing. Read ALLOWED_ORIGINS the same way the app does, so
    # this test holds whether or not the environment sets it.
    configured = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()]
    origin = configured[0] if configured else "http://localhost:5173"

    response = client.get("/api/notes", headers={"Origin": origin})

    assert response.status_code == 200
    assert response.headers.get("Access-Control-Allow-Origin") == origin
