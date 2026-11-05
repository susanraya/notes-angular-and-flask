# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
20 tests · Passed 19 · Failed 0 · Skipped 0 · Not run 1

Acceptance criteria covered: 6/22 · passing: 6/22
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start tests -->
## Sprint 1

### US-003: Create a note

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-003 | NotesBoardScreen > [AC-003] loads the board from GET /api/notes with no auth on init | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-003 | NotesBoardScreen > [AC-003] shows an error state with retry when the board fails to load | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-003 | NotesBoardScreen > [AC-003] shows the empty state when the board has no notes | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-004, AC-005 | NotesBoardScreen > [AC-004][AC-005] posting a note with body calls POST /api/notes with no auth and shows the server response | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-006 | NotesBoardScreen > [AC-006] a 400 from the API surfaces the required-content message | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-006 | NotesBoardScreen > [AC-006] does not call the API and shows the required message for whitespace-only body | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-002 | test_ac002_get_returns_empty_array_when_none_exist | Integration | Passed | `backend/tests/integration/test_notes_api.py` |
| AC-002 | test_ac002_get_returns_notes_newest_first | Integration | Passed | `backend/tests/integration/test_notes_api.py` |
| AC-003, AC-004 | test_ac003_and_ac004_post_creates_note_and_is_returned_by_get | Integration | Passed | `backend/tests/integration/test_notes_api.py` |
| AC-005 | test_ac005_post_with_empty_title_saves_with_no_title | Integration | Passed | `backend/tests/integration/test_notes_api.py` |
| AC-005 | test_ac005_post_with_missing_title_saves_with_no_title | Integration | Passed | `backend/tests/integration/test_notes_api.py` |
| AC-006 | test_ac006_post_with_empty_body_returns_400_and_creates_nothing | Integration | Passed | `backend/tests/integration/test_notes_api.py` |
| AC-006 | test_ac006_post_with_missing_body_returns_400_and_creates_nothing | Integration | Passed | `backend/tests/integration/test_notes_api.py` |
| AC-006 | test_ac006_post_with_whitespace_only_body_returns_400_and_creates_nothing | Integration | Passed | `backend/tests/integration/test_notes_api.py` |
| AC-007 | test_ac007_markup_is_stored_verbatim_and_extra_fields_ignored | Integration | Passed | `backend/tests/integration/test_notes_api.py` |
| — | test_nfr001_no_auth_required_and_no_personal_data_fields | Integration | Passed | `backend/tests/integration/test_notes_api.py` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | test_every_generated_route_is_registered | Unit | Passed | `backend/tests/test_health.py` |
| — | test_health_reports_ok | Unit | Passed | `backend/tests/test_health.py` |
| — | App > renders a screen inside the app shell and shows its menu | Unit | Passed | `frontend/src/app.component.spec.ts` |
| — | the app loads | E2E | Not run yet | `frontend/e2e/example.spec.ts` |
<!-- sdlc:auto:end tests -->
