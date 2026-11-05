<!-- sdlc:auto:start adr -->
# ADR-0002: Use Flask 3.0 for Backend

Status: Accepted  
Date: 2026-11-05

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- Flask 3.0
- FastAPI
- Django

## Decision Outcome

Chosen option: Flask 3.0, because Approved stack; a thin REST API over one notes table is a natural fit, exposing CRUD plus report and grievance-contact endpoints with no auth layer.

## Consequences

Minimal batteries-included tooling means validation and logging are hand-wired, which is acceptable at this scope.
<!-- sdlc:auto:end adr -->