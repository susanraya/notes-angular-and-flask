"""Integration tests for GET/POST /api/notes, exercised through the app's test client."""

from sqlalchemy import text

from app import create_app
from app.database import SessionLocal, engine

app = create_app()
client = app.test_client()


def setup_function() -> None:
    with engine.begin() as conn:
        conn.execute(text("DELETE FROM notes"))


def test_ac002_get_returns_empty_array_when_none_exist() -> None:
    response = client.get("/api/notes")

    assert response.status_code == 200
    assert response.get_json() == []


def test_ac002_get_returns_notes_newest_first() -> None:
    client.post("/api/notes", json={"title": "first", "body": "one"})
    client.post("/api/notes", json={"title": "second", "body": "two"})

    response = client.get("/api/notes")

    assert response.status_code == 200
    bodies = [n["body"] for n in response.get_json()]
    assert bodies == ["two", "one"]


def test_ac003_and_ac004_post_creates_note_and_is_returned_by_get() -> None:
    response = client.post("/api/notes", json={"title": "Hello", "body": "world"})

    assert response.status_code == 201
    created = response.get_json()
    assert created["id"] is not None
    assert created["created_at"] is not None
    assert created["title"] == "Hello"
    assert created["body"] == "world"
    assert created["reported"] is False
    assert created["report_count"] == 0

    listing = client.get("/api/notes").get_json()
    assert any(n["id"] == created["id"] for n in listing)


def test_ac005_post_with_missing_title_saves_with_no_title() -> None:
    response = client.post("/api/notes", json={"body": "no title here"})

    assert response.status_code == 201
    created = response.get_json()
    assert created["title"] is None


def test_ac005_post_with_empty_title_saves_with_no_title() -> None:
    response = client.post("/api/notes", json={"title": "", "body": "still fine"})

    assert response.status_code == 201
    assert response.get_json()["title"] is None


def test_ac006_post_with_missing_body_returns_400_and_creates_nothing() -> None:
    before = len(client.get("/api/notes").get_json())

    response = client.post("/api/notes", json={"title": "No body"})

    assert response.status_code == 400
    assert (
        "content" in response.get_json()["message"].lower()
        or "body" in response.get_json()["message"].lower()
    )
    after = len(client.get("/api/notes").get_json())
    assert after == before


def test_ac006_post_with_empty_body_returns_400_and_creates_nothing() -> None:
    before = len(client.get("/api/notes").get_json())

    response = client.post("/api/notes", json={"title": "Empty body", "body": ""})

    assert response.status_code == 400
    message = response.get_json()["message"].lower()
    assert "content" in message or "body" in message
    after = len(client.get("/api/notes").get_json())
    assert after == before


def test_ac006_post_with_whitespace_only_body_returns_400_and_creates_nothing() -> None:
    before = len(client.get("/api/notes").get_json())

    response = client.post("/api/notes", json={"body": "   "})

    assert response.status_code == 400
    after = len(client.get("/api/notes").get_json())
    assert after == before


def test_ac007_markup_is_stored_verbatim_and_extra_fields_ignored() -> None:
    response = client.post(
        "/api/notes",
        json={
            "body": "<b>bold</b> & stuff",
            "title": "t",
            "attachments": ["x.png"],
            "tags": ["a", "b"],
            "folder": "secret",
        },
    )

    assert response.status_code == 201
    created = response.get_json()
    assert created["body"] == "<b>bold</b> & stuff"
    assert "attachments" not in created
    assert "tags" not in created
    assert "folder" not in created

    with SessionLocal() as session:
        from app.models import Note

        row = session.query(Note).filter(Note.id == created["id"]).one()
        assert not hasattr(row, "attachments")


def test_nfr001_no_auth_required_and_no_personal_data_fields() -> None:
    # No Authorization header is sent on either call, and both succeed anyway.
    assert "Authorization" not in client.environ_base

    post_response = client.post("/api/notes", json={"body": "anonymous note"})
    assert post_response.status_code == 201
    created = post_response.get_json()
    personal_data_fields = {"email", "password", "account", "username", "name", "ip", "phone"}
    assert personal_data_fields.isdisjoint(created.keys())
    assert set(created.keys()) == {
        "id",
        "title",
        "body",
        "reported",
        "report_count",
        "created_at",
        "updated_at",
    }

    get_response = client.get("/api/notes", headers={})
    assert get_response.status_code == 200
    for note in get_response.get_json():
        assert personal_data_fields.isdisjoint(note.keys())
