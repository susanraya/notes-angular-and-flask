# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Access the board without logging in | US-001 | 1 | web_spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-002 | EPIC-001 | See the single shared board everyone uses | US-002 | 2 | GET /api/notes, api_backend, notes, notes_db | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-003 | EPIC-002 | Create a note | US-003, US-003-T1, US-003-T2, US-003-T3 | 1 | POST /api/notes, api_backend, notes, notes_db, web_spa | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-004 | EPIC-002 | Read all notes on the board | US-004 | 2 | GET /api/notes, api_backend, notes, web_spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-005 | EPIC-002 | Edit any note | US-005 | 2 | PUT /api/notes/{id}, api_backend, notes, web_spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-006 | EPIC-002 | Delete any note | US-006 | 2 | DELETE /api/notes/{id}, api_backend, notes, web_spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-007 | EPIC-003 | See others' changes on refresh | US-007 | 2 | GET /api/notes, notes, web_spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-008 | EPIC-004 | Report an objectionable note | US-008, US-008-T1, US-008-T2, US-008-T3 | 3 | POST /api/notes/{id}/report, api_backend, notes, notes_db, web_spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-009 | EPIC-004 | Make contact/grievance information available | US-009 | 2 | GET /api/grievance-contact, api_backend, web_spa | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-010 | EPIC-004 | Remove a reported or objectionable note | US-010 | 3 | DELETE /api/notes/{id}, api_backend, notes, web_spa | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-011 | EPIC-005 | Host notes data in India | US-011, US-011-T1, US-011-T2, US-011-T3 | 1 | api_backend, notes, notes_db | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
<!-- sdlc:auto:end matrix -->
