# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 (capacity 20) aimed to stand up India-hosted infrastructure, the no-login Angular shell, and the first full-stack slice for creating notes.

Plan v1 (approved) goal for Sprint 1: 'Stand up India-hosted infrastructure, the no-login Angular shell, and the first full-stack slice: creating notes (including the notes table schema).' Items inferred to belong to this sprint based on goal wording: EPIC-001 Open Access to the Shared Public Notes Board; US-001 Access the board without logging in (3 pts, frontend-agent); EPIC-005 India Data Hosting and Compliance Boundaries; US-011 Host notes data in India (8 pts, devops-agent) with tasks US-011-T1 Provision PostgreSQL 16 instance in AWS ap-south-1, US-011-T2 Deploy Flask API service to ap-south-1, US-011-T3 Configure network and security between API and database; EPIC-002 Create, Read, Edit and Delete Notes; US-003 Create a note (8 pts, backend-agent) with tasks US-003-T1 Create notes table schema and migration, US-003-T2 Implement POST /api/notes endpoint with validation, US-003-T3 Build note creation form in Angular board UI.

**Related:** US-001, US-003, US-003-T1, US-003-T2, US-003-T3, US-011, US-011-T1, US-011-T2, US-011-T3, EPIC-001, EPIC-002, EPIC-005

- ⚠ Plan input lists sprints and backlog items separately with no explicit per-item sprint assignment; the mapping above is inferred from sprint goal wording, not stated directly in the input.
- ⚠ Development run output reports no delivered ticket for US-001, US-003 (or its tasks US-003-T1/T2/T3), or US-011 (or its tasks US-011-T1/T2/T3), even though overall run status is 'completed' -- actual delivery status of this sprint's scope is unconfirmed.

### DEV-PLAN-SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 (capacity 20) aimed to deliver read/edit/delete note functionality, confirm single shared-board behavior, refresh-based update visibility, and grievance/contact info.

Plan v1 (approved) goal for Sprint 2: 'Deliver read/edit/delete note functionality, confirm single shared-board behavior, refresh-based update visibility, and grievance/contact info.' Items inferred to belong to this sprint: US-002 See the single shared board everyone uses (2 pts, backend-agent); US-004 Read all notes on the board (5 pts, frontend-agent); US-005 Edit any note (5 pts, backend-agent); US-006 Delete any note (3 pts, frontend-agent); EPIC-003 Update Visibility on Refresh; US-007 See others' changes on refresh (2 pts, frontend-agent); US-009 Make contact/grievance information available (3 pts, backend-agent).

**Related:** US-002, US-004, US-005, US-006, US-007, US-009, EPIC-002, EPIC-003

- ⚠ Plan input does not explicitly assign items to sprints; mapping above is inferred from goal wording.
- ⚠ All items in this sprint do have matching delivered tickets in the dev run output, which is consistent with this sprint's scope.

### DEV-PLAN-SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 (capacity 20) aimed to add note reporting and reported-content removal to align with the IT Intermediary Rules 2021.

Plan v1 (approved) goal for Sprint 3: 'Add note reporting and reported-content removal to align with the IT Intermediary Rules 2021.' Items inferred to belong to this sprint: EPIC-004 Report and Remove Objectionable Notes; US-008 Report an objectionable note (8 pts, backend-agent) with tasks US-008-T1 Add reported flag column migration, US-008-T2 Implement POST /api/notes/{id}/report endpoint, US-008-T3 Add report action and acknowledgement UI; US-010 Remove a reported or objectionable note (3 pts, frontend-agent).

**Related:** US-008, US-008-T1, US-008-T2, US-008-T3, US-010, EPIC-004

- ⚠ Plan input does not explicitly assign items to sprints; mapping above is inferred from goal wording.
- ⚠ Development run output reports no delivered ticket for US-008 (or its tasks US-008-T1/T2/T3) or US-010, even though overall run status is 'completed' -- actual delivery status of this sprint's scope (the IT Intermediary Rules 2021 compliance work) is unconfirmed and should be verified given its regulatory relevance.

### DEV-RUN-STATUS · draft · source: dev:run

The development run is marked 'completed' at the top level, but ticket-level reporting only confirms delivery for 6 of the 11 planned stories.

Development run status field reads 'completed'. Ticket-level output lists delivered status only for: US-002, US-004, US-005, US-006, US-007, US-009. No ticket entries (delivered or otherwise) are present in the input for: US-001, US-003 (plus tasks US-003-T1/T2/T3), US-008 (plus tasks US-008-T1/T2/T3), US-010, US-011 (plus tasks US-011-T1/T2/T3).

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011

- ⚠ Conflict: overall run status says 'completed' but roughly half the planned story points (including all of Sprint 1's and Sprint 3's inferred scope) have no corresponding delivered ticket -- needs reconciliation with the dev team or run log before this phase can be marked complete.
- ⚠ No evidence in the input as to whether US-001, US-003, US-008, US-010, US-011 are still in progress, blocked, or simply omitted from this report.

### DEV-US-002 · approved · source: dev:US-002

Ticket for 'See the single shared board everyone uses' was delivered.

Ticket US-002 (See the single shared board everyone uses) status=delivered, commit=68a2583c1a585ef4f9f11b98c28475bdacf1a229.

**Related:** US-002

- ⚠ Commit 68a2583c... is also cited for US-004 and US-007, suggesting these three stories may have been delivered together in one change; the input does not confirm whether they were implemented as a single combined commit or separately.

### DEV-US-004 · approved · source: dev:US-004

Ticket for 'Read all notes on the board' was delivered.

Ticket US-004 (Read all notes on the board) status=delivered, commit=68a2583c1a585ef4f9f11b98c28475bdacf1a229.

**Related:** US-004

- ⚠ Same commit hash as US-002 and US-007; unclear from input whether this reflects one bundled change or three independently-tracked but identically-hashed deliveries.

### DEV-US-005 · approved · source: dev:US-005

Ticket for 'Edit any note' was delivered.

Ticket US-005 (Edit any note) status=delivered, commit=fffec597d61ce97f1d13f8ca6e3ad608d961c064.

**Related:** US-005

- ⚠ Same commit hash as US-006; likely delivered together, not confirmed explicitly by input.

### DEV-US-006 · approved · source: dev:US-006

Ticket for 'Delete any note' was delivered.

Ticket US-006 (Delete any note) status=delivered, commit=fffec597d61ce97f1d13f8ca6e3ad608d961c064.

**Related:** US-006

- ⚠ Same commit hash as US-005; likely delivered together, not confirmed explicitly by input.

### DEV-US-007 · approved · source: dev:US-007

Ticket for 'See others' changes on refresh' was delivered.

Ticket US-007 (See others' changes on refresh) status=delivered, commit=68a2583c1a585ef4f9f11b98c28475bdacf1a229.

**Related:** US-007

- ⚠ Same commit hash as US-002 and US-004; unclear from input whether this reflects one bundled change or three independently-tracked but identically-hashed deliveries.

### DEV-US-009 · approved · source: dev:US-009

Ticket for 'Make contact/grievance information available' was delivered.

Ticket US-009 (Make contact/grievance information available) status=delivered, commit=7e98b65838a3dead8253a699caae65312cd37ba8.

**Related:** US-009
<!-- sdlc:auto:end narrative -->
