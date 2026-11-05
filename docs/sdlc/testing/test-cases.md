# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
63 tests · Passed 50 · Failed 0 · Skipped 0 · Not run 13

Acceptance criteria covered: 19/22 · passing: 7/22
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start tests -->
## Sprint 1

### US-003: Create a note

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-003 | NotesBoardScreen > [AC-003] loads the board from GET /api/notes with no auth on init | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-003 | NotesBoardScreen > [AC-003] shows an error state with retry when the board fails to load | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-004, AC-005 | NotesBoardScreen > [AC-004][AC-005] posting a note with body calls POST /api/notes with no auth and shows the server response | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-006 | NotesBoardScreen > [AC-006] a 400 from the API surfaces the required-content message | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-006 | NotesBoardScreen > [AC-006] does not call the API and shows the required message for whitespace-only body | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-008 | NotesBoardScreen > [AC-008] displays every note's title and plain-text body, with a placeholder when a title is absent | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-009 | NotesBoardScreen > [AC-009] shows the empty state, and renders no note items at all, when the board has no notes | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-010 | NotesBoardScreen > [AC-010] saving an edit calls PUT /api/notes/{id} with no auth and shows the server's note | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-011 | NotesBoardScreen > [AC-011] a 400 from PUT shows the required message and leaves the note unchanged | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-011 | NotesBoardScreen > [AC-011] clearing the body blocks the save client-side and shows the required message | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-012 | NotesBoardScreen > [AC-012] no undo, revision list, or previous-version UI appears after a save | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-013, AC-014 | NotesBoardScreen > [AC-013][AC-014] confirming delete calls DELETE /api/notes/{id}; cancel sends no request | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-017 | NotesBoardScreen > [AC-017] closing the acknowledgement dismisses it without sending another request | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| AC-017 | NotesBoardScreen > [AC-017] selecting report calls POST /api/notes/{id}/report, records the report, and shows the visitor an acknowledgement | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| — | NotesBoardScreen > [AC] a failing delete leaves an error visible | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
| — | NotesBoardScreen > [NFR-001] mutation calls carry no auth header, email, or personal field | Unit | Passed | `frontend/src/screens/notes-board.component.spec.ts` |
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

## Sprint 2

### US-004: Read all notes on the board

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-008 | [AC-008] visitor opens the board and reads every note's title and plain-text content | E2E | Not run yet | `frontend/e2e/notes-board-read.spec.ts` |
| AC-009 | [AC-009] visitor sees the empty-state message when no notes exist on the board | E2E | Not run yet | `frontend/e2e/notes-board-read.spec.ts` |

### US-005: Edit any note

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-010 | test_ac010_put_updates_title_and_body_regardless_of_creator | Integration | Passed | `backend/tests/integration/test_notes_mutations_api.py` |
| AC-011 | test_ac011_put_empty_body_returns_400_and_persists_nothing | Integration | Passed | `backend/tests/integration/test_notes_mutations_api.py` |
| AC-011 | test_ac011_put_missing_body_returns_400_and_persists_nothing | Integration | Passed | `backend/tests/integration/test_notes_mutations_api.py` |
| AC-011 | test_ac011_put_whitespace_only_body_returns_400_and_persists_nothing | Integration | Passed | `backend/tests/integration/test_notes_mutations_api.py` |
| AC-012 | test_ac012_put_overwrites_in_place_no_history | Integration | Passed | `backend/tests/integration/test_notes_mutations_api.py` |
| AC-013 | test_ac013_delete_removes_note_from_subsequent_get | Integration | Passed | `backend/tests/integration/test_notes_mutations_api.py` |
| — | test_delete_on_nonexistent_id_returns_404_with_message | Integration | Passed | `backend/tests/integration/test_notes_mutations_api.py` |
| — | test_nfr001_mutation_endpoints_require_no_auth_and_no_personal_fields | Integration | Passed | `backend/tests/integration/test_notes_mutations_api.py` |
| — | test_put_on_nonexistent_id_returns_404_with_message | Integration | Passed | `backend/tests/integration/test_notes_mutations_api.py` |
| — | test_report_on_nonexistent_id_returns_404_with_message | Integration | Passed | `backend/tests/integration/test_notes_mutations_api.py` |
| — | test_report_sets_reported_true_and_increments_count_on_repeat | Integration | Passed | `backend/tests/integration/test_notes_mutations_api.py` |
| AC-010 | [AC-010] editing a note in the UI and saving shows the revised note after a page reload | E2E | Not run yet | `frontend/e2e/notes-edit-delete.spec.ts` |
| AC-011 | [AC-011] clearing the body in the edit form and saving shows the required-content message and does not change the note after reload | E2E | Not run yet | `frontend/e2e/notes-edit-delete.spec.ts` |
| AC-013, AC-014 | [AC-013, AC-014] choosing delete shows a confirmation step; cancelling keeps the note, confirming removes it and it stays gone after reload | E2E | Not run yet | `frontend/e2e/notes-edit-delete.spec.ts` |

### US-009: Make contact/grievance information available

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-019 | GrievanceContactScreen > [AC-019] loads officer name, email, phone, address and response windows from GET /api/grievance-contact with no auth | Unit | Passed | `frontend/src/screens/grievance-contact.component.spec.ts` |
| AC-019 | GrievanceContactScreen > [AC-019] shows a loading state before the response resolves | Unit | Passed | `frontend/src/screens/grievance-contact.component.spec.ts` |
| AC-019 | GrievanceContactScreen > [AC-019] shows an error state with retry when the contact info fails to load | Unit | Passed | `frontend/src/screens/grievance-contact.component.spec.ts` |
| AC-019 | GrievanceContactScreen > [AC-019] the in-screen back link to the notes board still works | Unit | Passed | `frontend/src/screens/grievance-contact.component.spec.ts` |
| — | GrievanceContactScreen > [NFR-001] fetch is made with no auth and no sign-in or personal detail is requested | Unit | Passed | `frontend/src/screens/grievance-contact.component.spec.ts` |
| AC-019 | test_ac019_get_grievance_contact_returns_200_with_required_fields_populated | Integration | Passed | `backend/tests/integration/test_grievance_contact_api.py` |
| — | test_nfr001_no_auth_header_required_and_response_carries_no_caller_personal_data | Integration | Passed | `backend/tests/integration/test_grievance_contact_api.py` |
| AC-019 | [AC-019] a visible shell link reaches the grievance-contact screen without opening a note, and it shows contact details | E2E | Not run yet | `frontend/e2e/grievance-contact.spec.ts` |
| — | [NFR-001] the grievance-contact path requests no sign-in, email or other personal detail from the visitor | E2E | Not run yet | `frontend/e2e/grievance-contact.spec.ts` |

## Sprint 3

### US-008: Report an objectionable note

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-017 | [AC-017] a visitor selects report on a note, sees an acknowledgement, and the report is recorded on the board | E2E | Not run yet | `frontend/e2e/notes-report.spec.ts` |
| AC-018 | [AC-018] reporting a note needs no login step and no personal information, in the UI or the API contract | E2E | Not run yet | `frontend/e2e/notes-report.spec.ts` |
| AC-020 | [AC-020] removing a reported note via delete, once confirmed, is gone on reload and in a second, unrelated browser context | E2E | Not run yet | `frontend/e2e/notes-report.spec.ts` |
| — | [NFR-003] the report acknowledgement offers an escalation path to the grievance/contact information, and that page is reachable | E2E | Not run yet | `frontend/e2e/notes-report.spec.ts` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | test_every_generated_route_is_registered | Unit | Passed | `backend/tests/test_health.py` |
| — | test_health_reports_ok | Unit | Passed | `backend/tests/test_health.py` |
| — | App > renders a screen inside the app shell and shows its menu | Unit | Passed | `frontend/src/app.component.spec.ts` |
| AC-003 | test_ac003_get_returns_same_notes_regardless_of_headers_or_session | Integration | Passed | `backend/tests/integration/test_notes_shared_board_api.py` |
| AC-003 | test_ac003_post_by_one_client_is_visible_to_a_second_unrelated_client | Integration | Passed | `backend/tests/integration/test_notes_shared_board_api.py` |
| — | test_nfr001_get_does_not_require_or_accept_auth_token_email_or_personal_field | Integration | Passed | `backend/tests/integration/test_notes_shared_board_api.py` |
| — | the app loads | E2E | Not run yet | `frontend/e2e/example.spec.ts` |
| AC-015, AC-016 | [AC-015][AC-016] a note created, edited and deleted via the API while the page is open only appears after reload, not before | E2E | Not run yet | `frontend/e2e/notes-board-api-sync.spec.ts` |
<!-- sdlc:auto:end tests -->
