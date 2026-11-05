"""Integration tests for PUT/DELETE /api/notes/{id} and POST /api/notes/{id}/report."""

from sqlalchemy import text

from app import create_app
from app.database import engine

app = create_app()
client = app.test_client()


def setup_function() -> None:
    with engine.begin() as conn:
        conn.execute(text("DELETE FROM notes"))


def _create(title: str | None = "t", body: str = "original") -> dict:
    payload = {"body": body}
    if title is not None:
        payload["title"] = title
    response = client.post("/api/notes", json=payload)
    return response.get_json()


def test_ac010_put_updates_title_and_body_regardless_of_creator() -> None:
    created = _create(title="old", body="old body")

    response = client.put(f"/api/notes/{created['id']}", json={"title": "new", "body": "new body"})

    assert response.status_code == 200
    updated = response.get_json()
    assert updated["id"] == created["id"]
    assert updated["title"] == "new"
    assert updated["body"] == "new body"
    assert updated["reported"] is False
    assert updated["report_count"] == 0
    assert updated["created_at"] is not None
    assert updated["updated_at"] is not None


def test_ac011_put_missing_body_returns_400_and_persists_nothing() -> None:
    created = _create(title="keep", body="keep body")

    response = client.put(f"/api/notes/{created['id']}", json={"title": "changed"})

    assert response.status_code == 400
    message = response.get_json()["message"].lower()
    assert "content" in message or "body" in message

    unchanged = client.get("/api/notes").get_json()
    note = next(n for n in unchanged if n["id"] == created["id"])
    assert note["title"] == "keep"
    assert note["body"] == "keep body"


def test_ac011_put_empty_body_returns_400_and_persists_nothing() -> None:
    created = _create(body="keep body")

    response = client.put(f"/api/notes/{created['id']}", json={"body": ""})

    assert response.status_code == 400
    unchanged = client.get("/api/notes").get_json()
    note = next(n for n in unchanged if n["id"] == created["id"])
    assert note["body"] == "keep body"


def test_ac011_put_whitespace_only_body_returns_400_and_persists_nothing() -> None:
    created = _create(body="keep body")

    response = client.put(f"/api/notes/{created['id']}", json={"body": "   "})

    assert response.status_code == 400
    unchanged = client.get("/api/notes").get_json()
    note = next(n for n in unchanged if n["id"] == created["id"])
    assert note["body"] == "keep body"


def test_ac012_put_overwrites_in_place_no_history() -> None:
    created = _create(body="v1")

    response = client.put(f"/api/notes/{created['id']}", json={"body": "v2"})
    updated = response.get_json()

    assert set(updated.keys()) == {
        "id",
        "title",
        "body",
        "reported",
        "report_count",
        "created_at",
        "updated_at",
    }

    listing = client.get("/api/notes").get_json()
    assert len([n for n in listing if n["id"] == created["id"]]) == 1


def test_ac013_delete_removes_note_from_subsequent_get() -> None:
    created = _create(body="to delete")

    response = client.delete(f"/api/notes/{created['id']}")

    assert response.status_code in (200, 204)

    listing = client.get("/api/notes").get_json()
    assert all(n["id"] != created["id"] for n in listing)


def test_report_sets_reported_true_and_increments_count_on_repeat() -> None:
    created = _create(body="reportable")

    first = client.post(f"/api/notes/{created['id']}/report")
    assert first.status_code == 200
    first_note = first.get_json()
    assert first_note["reported"] is True
    assert first_note["report_count"] == 1

    second = client.post(f"/api/notes/{created['id']}/report")
    assert second.status_code == 200
    second_note = second.get_json()
    assert second_note["reported"] is True
    assert second_note["report_count"] == 2


def test_put_on_nonexistent_id_returns_404_with_message() -> None:
    response = client.put("/api/notes/999999", json={"body": "x"})

    assert response.status_code == 404
    assert "message" in response.get_json()


def test_delete_on_nonexistent_id_returns_404_with_message() -> None:
    response = client.delete("/api/notes/999999")

    assert response.status_code == 404
    assert "message" in response.get_json()


def test_report_on_nonexistent_id_returns_404_with_message() -> None:
    response = client.post("/api/notes/999999/report")

    assert response.status_code == 404
    assert "message" in response.get_json()


def test_nfr001_mutation_endpoints_require_no_auth_and_no_personal_fields() -> None:
    assert "Authorization" not in client.environ_base
    created = _create(body="anon note")

    put_response = client.put(f"/api/notes/{created['id']}", json={"body": "anon update"})
    assert put_response.status_code == 200
    personal_data_fields = {"email", "password", "account", "username", "name", "ip", "phone"}
    assert personal_data_fields.isdisjoint(put_response.get_json().keys())

    report_response = client.post(f"/api/notes/{created['id']}/report")
    assert report_response.status_code == 200
    assert personal_data_fields.isdisjoint(report_response.get_json().keys())

    delete_response = client.delete(f"/api/notes/{created['id']}")
    assert delete_response.status_code in (200, 204)
