"""Applies the SQL migrations in this directory to DATABASE_URL, in filename order.

Tracks what has already run in a `schema_migrations` table so re-running is a no-op.
Run it from the repository root:

    backend/.venv/bin/python backend/migrations/run_migrations.py
"""

import os
from pathlib import Path

from sqlalchemy import create_engine, text

MIGRATIONS_DIR = Path(__file__).resolve().parent


def run() -> None:
    database_url = os.environ["DATABASE_URL"]
    engine = create_engine(database_url, future=True)
    with engine.begin() as conn:
        conn.execute(
            text(
                "CREATE TABLE IF NOT EXISTS schema_migrations ("
                "filename VARCHAR(255) PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())"
            )
        )
        applied = {row[0] for row in conn.execute(text("SELECT filename FROM schema_migrations"))}
        for sql_file in sorted(MIGRATIONS_DIR.glob("*.sql")):
            if sql_file.name in applied:
                continue
            conn.execute(text(sql_file.read_text()))
            conn.execute(
                text("INSERT INTO schema_migrations (filename) VALUES (:filename)"),
                {"filename": sql_file.name},
            )
            print(f"applied {sql_file.name}")
    engine.dispose()


if __name__ == "__main__":
    run()
