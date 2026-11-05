<!-- sdlc:auto:start adr -->
# ADR-0001: Use Angular 22 for Frontend

Status: Accepted  
Date: 2026-11-05

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- Angular 22
- React
- Vue

## Decision Outcome

Chosen option: Angular 22, because Approved stack; renders the single shared board, create/edit/delete forms with validation, delete confirmation, empty-state, and the report action in one SPA that reloads data on refresh.

## Consequences

Full framework is heavier than needed for such a small app, but gives a clear component/service structure and strong forms/validation out of the box.
<!-- sdlc:auto:end adr -->