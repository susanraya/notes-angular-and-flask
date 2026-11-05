<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-05

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because Approved stack; reliably stores one shared notes table (title, body, timestamps, reported flag) and allows any row to be edited wiki-style; hosted on RDS in Mumbai to meet data residency.

## Consequences

A full RDBMS is more than a single-table app strictly needs, but gives durability, managed backups and India-region hosting with no extra work.
<!-- sdlc:auto:end adr -->