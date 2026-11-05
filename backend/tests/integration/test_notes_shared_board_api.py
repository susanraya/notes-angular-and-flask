"""Integration tests proving the board is shared: no per-user/session filter on GET,
one client's POST is visible to an unrelated client's GET, and the read path needs no
auth token, email, or other personal field."""

from sqlalchemy import text

from app import create_app
from app.database import engine

app = create_app()


def setup_function() -> None:
    with engine.begin() as conn:
        conn.execute(text("DELETE FROM notes"))


def test_ac003_get_returns_same_notes_regardless_of_headers_or_session() -> None:
    client = app.test_client()
    client.post("/api/notes", json={"title": "shared", "body": "shared body"})

    plain = client.get("/api/notes").get_json()
    with_headers = client.get(
        "/api/notes",
        headers={
            "Authorization": "Bearer fake-token",
            "X-Session-Id": "abc123",
            "Cookie": "sessionid=unrelated-value",
            "User-Agent": "WeirdClient/1.0",
        },
    ).get_json()
    no_headers = client.get("/api/notes", headers={}).get_json()

    assert plain == with_headers == no_headers


def test_ac003_post_by_one_client_is_visible_to_a_second_unrelated_client() -> None:
    client_a = app.test_client()
    client_b = app.test_client()

    created = client_a.post(
        "/api/notes", json={"title": "from A", "body": "visible to B"}
    ).get_json()

    listing_b = client_b.get("/api/notes").get_json()
    assert any(
        n["id"] == created["id"] and n["body"] == "visible to B" for n in listing_b
    )


def test_nfr001_get_does_not_require_or_accept_auth_token_email_or_personal_field() -> None:
    client = app.test_client()
    client.post("/api/notes", json={"body": "note for nfr check"})

    bare = client.get("/api/notes")
    assert bare.status_code == 200

    with_bogus_auth = client.get(
        "/api/notes", headers={"Authorization": "Bearer not-a-real-token"}
    )
    assert with_bogus_auth.status_code == 200
    assert with_bogus_auth.get_json() == bare.get_json()

    with_email_param = client.get("/api/notes?email=someone@example.com&user_id=42")
    assert with_email_param.status_code == 200
    assert with_email_param.get_json() == bare.get_json()

    personal_data_fields = {
        "email",
        "password",
        "account",
        "username",
        "name",
        "ip",
        "phone",
        "user_id",
        "session",
    }
    for note in bare.get_json():
        assert personal_data_fields.isdisjoint(note.keys())
