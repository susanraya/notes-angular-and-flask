# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-001 · approved · source: plan:v1

Development plan version 1 is approved. It organizes all 11 requirements into 5 epics and 3 sprints (20 points capacity each) covering no-login board access, notes CRUD, refresh-based visibility, reporting/removal of content, and India data hosting.

Plan status: approved, version 1. Three sprints: Sprint 1 - stand up India-hosted infrastructure, no-login Angular shell, and note creation (including schema); Sprint 2 - read/edit/delete notes, confirm single shared-board behavior, refresh-based update visibility, and grievance/contact info; Sprint 3 - note reporting and reported-content removal to align with the IT Intermediary Rules 2021. No sprint-to-backlog-item mapping was explicitly stated beyond goal narratives.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011

- ⚠ No development execution status (commits, code, PRs, ticket completion) was provided for this phase; only the sprint backlog breakdown is available.
- ⚠ No explicit dates for sprint start/end were given.

### SPRINT-1 · draft · source: plan:Sprint 1

Sprint 1 goal: stand up India-hosted infrastructure, the no-login Angular shell, and the first full-stack slice for creating notes.

Goal: Stand up India-hosted infrastructure, the no-login Angular shell, and the first full-stack slice: creating notes (including the notes table schema). Capacity: 20 points.

- ⚠ Input does not explicitly list which backlog items are assigned to this sprint; only the goal narrative is given, so item-to-sprint mapping is unconfirmed.

### SPRINT-2 · draft · source: plan:Sprint 2

Sprint 2 goal: deliver read/edit/delete note functionality, confirm single shared-board behavior, refresh-based update visibility, and grievance/contact info.

Goal: Deliver read/edit/delete note functionality, confirm single shared-board behavior, refresh-based update visibility, and grievance/contact info. Capacity: 20 points.

- ⚠ Input does not explicitly list which backlog items are assigned to this sprint; only the goal narrative is given, so item-to-sprint mapping is unconfirmed.

### SPRINT-3 · draft · source: plan:Sprint 3

Sprint 3 goal: add note reporting and reported-content removal to align with the IT Intermediary Rules 2021.

Goal: Add note reporting and reported-content removal to align with the IT Intermediary Rules 2021. Capacity: 20 points.

- ⚠ Input does not explicitly list which backlog items are assigned to this sprint; only the goal narrative is given, so item-to-sprint mapping is unconfirmed.
- ⚠ The specific provisions of the IT Intermediary Rules 2021 being targeted are not detailed in the input beyond 'reporting and removal' -- full regulatory scope is unconfirmed.

### EPIC-001 · draft · source: plan:EPIC-001

Epic covering open, no-login access to a single shared public notes board.

Epic 'Open Access to the Shared Public Notes Board' groups US-001 (access without login) and US-002 (single shared board for everyone). No points or role assigned at the epic level.

**Related:** US-001, US-002

- ⚠ No epic-level owner/role assigned.
- ⚠ No completion status provided.

### US-001 · draft · source: plan:US-001

Allows any user to access the notes board without a login step.

Story: Access the board without logging in. Points: 3. Assigned role: frontend-agent. Part of EPIC-001 (Open Access to the Shared Public Notes Board).

**Related:** EPIC-001

- ⚠ No implementation evidence (code, ticket status) provided; only backlog assignment is known.

### US-002 · draft · source: plan:US-002

Ensures all users see and interact with the same single shared board rather than separate/private boards.

Story: See the single shared board everyone uses. Points: 2. Assigned role: backend-agent. Part of EPIC-001 (Open Access to the Shared Public Notes Board).

**Related:** EPIC-001

- ⚠ No implementation evidence (code, ticket status) provided; only backlog assignment is known.

### EPIC-002 · draft · source: plan:EPIC-002

Epic covering wiki-style create, read, edit, and delete functionality for notes.

Epic 'Create, Read, Edit and Delete Notes (Wiki-style)' groups US-003 (create), US-004 (read), US-005 (edit any note), US-006 (delete any note). No points or role assigned at the epic level.

**Related:** US-003, US-004, US-005, US-006

- ⚠ No epic-level owner/role assigned.
- ⚠ No completion status provided.

### US-003 · draft · source: plan:US-003

Covers the ability to create a new note, including the underlying schema, API endpoint, and UI form.

Story: Create a note. Points: 8. Assigned role: backend-agent. Part of EPIC-002. Broken into tasks: (1) US-003-T1 - create notes table schema and migration (backend-agent); (2) US-003-T2 - implement POST /api/notes endpoint with validation (backend-agent); (3) US-003-T3 - build note creation form in Angular board UI (frontend-agent).

**Related:** EPIC-002

- ⚠ No implementation or test evidence provided for the schema, API endpoint, or UI form tasks; only task assignments are known.

### US-004 · draft · source: plan:US-004

Covers displaying all notes on the shared board to the user.

Story: Read all notes on the board. Points: 5. Assigned role: frontend-agent. Part of EPIC-002.

**Related:** EPIC-002

- ⚠ No implementation evidence (code, ticket status) provided; only backlog assignment is known.

### US-005 · draft · source: plan:US-005

Covers editing any note on the shared board (no ownership restriction implied).

Story: Edit any note. Points: 5. Assigned role: backend-agent. Part of EPIC-002.

**Related:** EPIC-002

- ⚠ No implementation evidence (code, ticket status) provided; only backlog assignment is known.
- ⚠ Input does not clarify whether edit permissions are restricted in any way; story title suggests any user can edit any note.

### US-006 · draft · source: plan:US-006

Covers deleting any note on the shared board (no ownership restriction implied).

Story: Delete any note. Points: 3. Assigned role: frontend-agent. Part of EPIC-002.

**Related:** EPIC-002

- ⚠ No implementation evidence (code, ticket status) provided; only backlog assignment is known.
- ⚠ Input does not clarify whether delete permissions are restricted in any way.

### EPIC-003 · draft · source: plan:EPIC-003

Epic covering visibility of other users' changes when the page is refreshed.

Epic 'Update Visibility on Refresh' groups US-007 (see others' changes on refresh). No points or role assigned at the epic level.

**Related:** US-007

- ⚠ No epic-level owner/role assigned.
- ⚠ No completion status provided.

### US-007 · draft · source: plan:US-007

Covers showing changes made by other users once the page is refreshed (not necessarily real-time).

Story: See others' changes on refresh. Points: 2. Assigned role: frontend-agent. Part of EPIC-003.

**Related:** EPIC-003

- ⚠ No implementation evidence (code, ticket status) provided; only backlog assignment is known.
- ⚠ Input confirms refresh-based (not real-time/live) updates per Sprint 2 goal, but no implementation confirmation is given.

### EPIC-004 · draft · source: plan:EPIC-004

Epic covering reporting objectionable notes, making grievance contact info available, and removing flagged content, per IT Intermediary Rules 2021 alignment goal.

Epic 'Report and Remove Objectionable Notes' groups US-008 (report a note), US-009 (grievance/contact info), US-010 (remove a reported/objectionable note). No points or role assigned at the epic level. Sprint 3 goal states this work aims to align with the IT Intermediary Rules 2021.

**Related:** US-008, US-009, US-010

- ⚠ No epic-level owner/role assigned.
- ⚠ No completion status provided.
- ⚠ Scope of IT Intermediary Rules 2021 compliance is stated only at the goal-narrative level; no detailed regulatory requirement mapping was provided to confirm full coverage.

### US-008 · draft · source: plan:US-008

Covers the ability to report an objectionable note, including schema, API endpoint, and UI acknowledgement.

Story: Report an objectionable note. Points: 8. Assigned role: backend-agent. Part of EPIC-004. Broken into tasks: (1) US-008-T1 - add reported flag column migration (backend-agent); (2) US-008-T2 - implement POST /api/notes/{id}/report endpoint (backend-agent); (3) US-008-T3 - add report action and acknowledgement UI (frontend-agent).

**Related:** EPIC-004

- ⚠ No implementation or test evidence provided for the schema, endpoint, or UI tasks; only task assignments are known.

### US-009 · draft · source: plan:US-009

Covers making grievance/contact information available to users, relevant to IT Intermediary Rules 2021 compliance.

Story: Make contact/grievance information available. Points: 3. Assigned role: backend-agent. Part of EPIC-004.

**Related:** EPIC-004

- ⚠ No implementation evidence (code, ticket status) provided; only backlog assignment is known.
- ⚠ Content of the grievance/contact information itself is not specified in the input.

### US-010 · draft · source: plan:US-010

Covers removing a note that has been reported or is otherwise objectionable.

Story: Remove a reported or objectionable note. Points: 3. Assigned role: frontend-agent. Part of EPIC-004.

**Related:** EPIC-004

- ⚠ No implementation evidence (code, ticket status) provided; only backlog assignment is known.
- ⚠ Input does not specify who has authority to remove a reported note (e.g. moderator vs. any user).

### EPIC-005 · draft · source: plan:EPIC-005

Epic covering hosting notes data within India and related compliance boundaries.

Epic 'India Data Hosting and Compliance Boundaries' groups US-011 (host notes data in India). No points or role assigned at the epic level.

**Related:** US-011

- ⚠ No epic-level owner/role assigned.
- ⚠ No completion status provided.
- ⚠ 'Compliance boundaries' in the epic title are not further detailed beyond data hosting location in the input.

### US-011 · draft · source: plan:US-011

Covers hosting the notes application's data and API within India (AWS ap-south-1 region).

Story: Host notes data in India. Points: 8. Assigned role: devops-agent. Part of EPIC-005. Broken into tasks: (1) US-011-T1 - provision PostgreSQL 16 instance in AWS ap-south-1 (devops-agent); (2) US-011-T2 - deploy Flask API service to ap-south-1 infrastructure (devops-agent); (3) US-011-T3 - configure network and security between API and database (devops-agent).

**Related:** EPIC-005

- ⚠ No implementation or deployment evidence provided for provisioning, deployment, or network/security configuration tasks; only task assignments are known.
- ⚠ No deployment phase input exists yet to confirm these infrastructure tasks were actually completed.
<!-- sdlc:auto:end narrative -->
