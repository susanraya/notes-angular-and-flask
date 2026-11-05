# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| GET | /health | health | `backend/app/__init__.py:39` | Liveness probe, and the only view here that is not a stub. |
| GET | /api/grievance-contact | get_api_grievance_contact | `backend/app/routes/api.py:14` | Return platform grievance/contact information for IT (Intermediary) Rules 2021 compliance. |
| GET | /api/notes | get_api_notes | `backend/app/routes/web_spa.py:22` | List all notes on the shared board; empty array when none exist. |
| POST | /api/notes | post_api_notes | `backend/app/routes/web_spa.py:28` | Create a note; body required, title optional; stores plain text only. |
| DELETE | /api/notes/{id} | delete_api_notes_by_id | `backend/app/routes/web_spa.py:50` | Permanently delete any note (also used to remove reported notes). |
| PUT | /api/notes/{id} | put_api_notes_by_id | `backend/app/routes/web_spa.py:38` | Edit any note wiki-style; body required; no version history kept. |
| POST | /api/notes/{id}/report | post_api_notes_by_id_report | `backend/app/routes/web_spa.py:59` | Report a note as objectionable; sets reported flag; no personal data required. |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
_Code matches the designed API._
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `1788b89`
<!-- sdlc:auto:end source -->
