# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Stand up India-hosted infrastructure, the no-login Angular shell, and the first full-stack slice: creating notes (including the notes table schema).

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Access the board without logging in | 3 | frontend-agent | — |
| US-003 | Story | Create a note | 8 | backend-agent | US-011 |
| ↳ US-003-T1 | Task | Create notes table schema and migration | — | backend-agent | — |
| ↳ US-003-T2 | Task | Implement POST /api/notes endpoint with validation | — | backend-agent | — |
| ↳ US-003-T3 | Task | Build note creation form in Angular board UI | — | frontend-agent | — |
| US-011 | Story | Host notes data in India | 8 | devops-agent | — |
| ↳ US-011-T1 | Task | Provision PostgreSQL 16 instance in AWS ap-south-1 | — | devops-agent | — |
| ↳ US-011-T2 | Task | Deploy Flask API service to ap-south-1 infrastructure | — | devops-agent | — |
| ↳ US-011-T3 | Task | Configure network and security between API and database | — | devops-agent | — |

## Sprint 2: Sprint 2

Deliver read/edit/delete note functionality, confirm single shared-board behavior, refresh-based update visibility, and grievance/contact info.

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-002 | Story | See the single shared board everyone uses | 2 | backend-agent | US-003 |
| US-004 | Story | Read all notes on the board | 5 | frontend-agent | US-003 |
| US-005 | Story | Edit any note | 5 | backend-agent | US-004 |
| US-006 | Story | Delete any note | 3 | frontend-agent | US-004 |
| US-007 | Story | See others' changes on refresh | 2 | frontend-agent | US-004 |
| US-009 | Story | Make contact/grievance information available | 3 | backend-agent | US-001 |

## Sprint 3: Sprint 3

Add note reporting and reported-content removal to align with the IT Intermediary Rules 2021.

Capacity: 20 points · Committed: 11

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-008 | Story | Report an objectionable note | 8 | backend-agent | US-003, US-004 |
| ↳ US-008-T1 | Task | Add reported flag column migration | — | backend-agent | — |
| ↳ US-008-T2 | Task | Implement POST /api/notes/{id}/report endpoint | — | backend-agent | — |
| ↳ US-008-T3 | Task | Add report action and acknowledgement UI | — | frontend-agent | — |
| US-010 | Story | Remove a reported or objectionable note | 3 | frontend-agent | US-006, US-008 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
