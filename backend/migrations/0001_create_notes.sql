-- Creates the notes table for the shared board.
-- Additive only: safe to re-run, and safe alongside any pre-existing data.
CREATE TABLE IF NOT EXISTS notes (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200),
    body TEXT NOT NULL,
    reported BOOLEAN NOT NULL DEFAULT FALSE,
    report_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
