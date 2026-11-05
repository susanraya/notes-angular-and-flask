# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### PLAN-V1 · approved · source: plan:v1

Development plan version 1 is approved. It organizes all 11 user stories under 5 epics into 3 sprints, each with a capacity of 20 points.

Plan status: approved, version 1. Scope covers: EPIC-001 Open Access to the Shared Public Notes Board, EPIC-002 Create/Read/Edit/Delete Notes, EPIC-003 Update Visibility on Refresh, EPIC-004 Report and Remove Objectionable Notes, EPIC-005 India Data Hosting and Compliance Boundaries. Work is sequenced across Sprint 1, Sprint 2, and Sprint 3, each sized at 20 points capacity.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011

- ⚠ Input does not provide an explicit field mapping each backlog item to a sprint; sprint membership below is inferred from each sprint's goal text, not an explicit assignment table.

### SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 goal: stand up India-hosted infrastructure, the no-login Angular shell, and the first full-stack slice for creating notes, capacity 20 points.

Goal: 'Stand up India-hosted infrastructure, the no-login Angular shell, and the first full-stack slice: creating notes (including the notes table schema).' Inferred scope based on goal wording: US-001 (access board without logging in), US-003 (create a note) with its tasks US-003-T1 (notes table schema/migration), US-003-T2 (POST /api/notes endpoint with validation), US-003-T3 (note creation form in Angular UI), and US-011 (host notes data in India) with its tasks US-011-T1 (provision PostgreSQL 16 in AWS ap-south-1), US-011-T2 (deploy Flask API to ap-south-1), US-011-T3 (configure network/security between API and database).

**Related:** US-001, US-003, US-011

### SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 goal: deliver read/edit/delete note functionality, confirm single shared-board behavior, refresh-based update visibility, and grievance/contact info, capacity 20 points.

Goal: 'Deliver read/edit/delete note functionality, confirm single shared-board behavior, refresh-based update visibility, and grievance/contact info.' Inferred scope: US-002 (single shared board everyone uses), US-004 (read all notes on the board), US-005 (edit any note), US-006 (delete any note), US-007 (see others' changes on refresh), US-009 (make contact/grievance information available).

**Related:** US-002, US-004, US-005, US-006, US-007, US-009

### SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 goal: add note reporting and reported-content removal to align with the IT Intermediary Rules 2021, capacity 20 points.

Goal: 'Add note reporting and reported-content removal to align with the IT Intermediary Rules 2021.' Inferred scope: US-008 (report an objectionable note) with tasks US-008-T1 (reported flag column migration), US-008-T2 (POST /api/notes/{id}/report endpoint), US-008-T3 (report action/acknowledgement UI); and US-010 (remove a reported or objectionable note). The plan explicitly frames this sprint's work as a compliance response to India's IT Intermediary Rules 2021.

**Related:** US-008, US-010

- ⚠ Compliance framing (IT Intermediary Rules 2021) is stated only at the sprint-goal level; no separate compliance sign-off or legal review record was provided in this input.

### BACKLOG-STRUCTURE · approved · source: plan:v1

Full backlog breakdown: 5 epics containing 11 stories (33 total points across EPIC-002/003/004/005 stories plus EPIC-001) and their supporting engineering tasks, with assigned roles.

EPIC-001 Open Access to the Shared Public Notes Board: US-001 Access the board without logging in (3 pts, frontend-agent), US-002 See the single shared board everyone uses (2 pts, backend-agent).
EPIC-002 Create, Read, Edit and Delete Notes (Wiki-style): US-003 Create a note (8 pts, backend-agent) with US-003-T1 notes table schema/migration, US-003-T2 POST /api/notes endpoint with validation, US-003-T3 note creation form in Angular UI (all backend/frontend-agent as noted); US-004 Read all notes on the board (5 pts, frontend-agent); US-005 Edit any note (5 pts, backend-agent); US-006 Delete any note (3 pts, frontend-agent).
EPIC-003 Update Visibility on Refresh: US-007 See others' changes on refresh (2 pts, frontend-agent).
EPIC-004 Report and Remove Objectionable Notes: US-008 Report an objectionable note (8 pts, backend-agent) with US-008-T1 reported flag column migration, US-008-T2 POST /api/notes/{id}/report endpoint, US-008-T3 report action/acknowledgement UI; US-009 Make contact/grievance information available (3 pts, backend-agent); US-010 Remove a reported or objectionable note (3 pts, frontend-agent).
EPIC-005 India Data Hosting and Compliance Boundaries: US-011 Host notes data in India (8 pts, devops-agent) with US-011-T1 provision PostgreSQL 16 in AWS ap-south-1, US-011-T2 deploy Flask API to ap-south-1, US-011-T3 configure network/security between API and database.
All 5 epics are listed with points=None and role unassigned (epics are not themselves estimated or staffed in this plan).

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011

### DEV-RUN-STATUS · draft · source: dev:run

The development run itself is reported as 'completed', but only 2 of the 11 planned stories (US-008 and US-010) have individual ticket-level delivery records in this input.

Development run status: completed. Only two tickets were reported: US-008 (Report an objectionable note) and US-010 (Remove a reported or objectionable note), both status=delivered, both referencing commit 3dc71c000fc284a972dae9532b02b5bee6110742.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011

- ⚠ Run status says 'completed' but no ticket-level delivery evidence was provided for US-001, US-002, US-003 (+ T1/T2/T3), US-004, US-005, US-006, US-007, US-009, or US-011 (+ T1/T2/T3) -- their implementation status cannot be confirmed from this input.
- ⚠ US-008 and US-010 both cite the exact same commit hash; it is unclear whether this reflects a single combined commit covering both tickets or a data duplication/reporting error -- flagging rather than assuming either explanation.

### TICKET-US-008 · approved · source: dev:TICKET-US-008

Ticket US-008 'Report an objectionable note' is recorded as delivered.

Ticket US-008: Report an objectionable note - status=delivered, commit=3dc71c000fc284a972dae9532b02b5bee6110742. Covers reporting flow backed by the planned tasks: reported-flag column migration, POST /api/notes/{id}/report endpoint, and report action/acknowledgement UI (per plan backlog, not independently confirmed per-task in this delivery record).

**Related:** US-008, US-008-T1, US-008-T2, US-008-T3

- ⚠ No per-task (T1/T2/T3) delivery confirmation was provided -- only the parent story US-008 is marked delivered.

### TICKET-US-010 · approved · source: dev:TICKET-US-010

Ticket US-010 'Remove a reported or objectionable note' is recorded as delivered.

Ticket US-010: Remove a reported or objectionable note - status=delivered, commit=3dc71c000fc284a972dae9532b02b5bee6110742. Functionally depends on reporting capability from US-008 per the EPIC-004 grouping.

**Related:** US-010, US-008

- ⚠ Shares the identical commit hash with US-008's delivery record -- see DEV-RUN-STATUS gap for discrepancy note.
<!-- sdlc:auto:end narrative -->
