# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `9468542` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This is a generated two-app repository for a simple notes app: an Angular 22 frontend (built with Vite via the Analog plugin) that renders fully-approved screens against seeded sample data, and a Flask 3.0 backend that currently exposes only a health check because no backend architecture had been approved yet. The two apps are decoupled — the frontend talks to the backend only through a thin `apiFetch` client that isn't wired into any screen yet — and a Postgres 16 container is defined for later use, while the backend falls back to local SQLite if no database is configured.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for Angular 22 / Vite 6 / npm)
- Python 3.12
- pip
- Docker and Docker Compose (optional, for the Postgres service)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. Copy .env.example to .env and fill in values as needed
3. cd frontend && npm install
4. cd backend && pip install -r requirements.txt
5. (optional) from the repo root, run docker compose up db to start Postgres 16 if you want to point DATABASE_URL at it
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Starts the Vite dev server for the Angular app (run from frontend/) |
| frontend build | `npm run build` | Compiles the Angular components ahead-of-time via Analog and bundles the app |
| frontend preview | `npm run preview` | Serves the production build locally |
| frontend typecheck | `npm run typecheck` | Runs the Angular compiler (ngc) over the app, including templates |
| backend dev | `flask --app app run --debug` | Starts the Flask dev server with the health-check endpoint (run from backend/) |
| db (docker) | `docker compose up db` | Starts a Postgres 16 container defined in docker-compose.yml |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `frontend/` | Angular 22 / Vite / Analog app with approved screens running on seeded sample data |
| `frontend/src` | App source: main.ts bootstrap, lib/ (api client, ui helpers, icons, navigation, screen base), index.css |
| `frontend/e2e` | Playwright end-to-end specs |
| `backend/` | Flask 3.0 API service, currently only a health check and app scaffolding |
| `backend/app` | Application factory, database engine/session setup, SQLAlchemy models, and route blueprints |
| `backend/tests` | Pytest tests (currently covering the health endpoint) |
| `.devcontainer` | VS Code devcontainer configuration |
| `.quorq` | Quorq platform handoff metadata (handoff.json) |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend uses the Flask application-factory pattern (create_app) with one blueprint per architecture component that owns endpoints
- Generated backend views start as stubs returning placeholders before implementation
- SQLAlchemy models inherit from a shared Base in app/database.py; tables are created via Base.metadata.create_all on startup (no migrations yet)
- DATABASE_URL env var selects the database; SQLite is the default fallback so the app runs with no external DB
- CORS origins are configured via the ALLOWED_ORIGINS env var, falling back to localhost dev origins
- Frontend screens live under src/screens/ as one component per approved screen, extending screen-base for navigate/brand
- Frontend uses zoneless change detection and Angular Router configured in app.component.ts
- API calls go through a single apiFetch helper in src/lib/api.ts, which attaches a bearer token (session token or shared secret) and reads VITE_API_BASE_URL/VITE_API_SECRET_KEY
- Frontend component tests sit beside the components they test (x.component.spec.ts), run with Vitest/TestBed; Playwright specs live separately in e2e/
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `npm run test` | Runs Vitest component tests with Angular's TestBed (from frontend/) |
| frontend lint | `npm run lint` | Runs ESLint over the frontend app |
| frontend e2e | `npm run test:e2e` | Runs Playwright acceptance tests from e2e/, building/serving the app (or using E2E_BASE_URL) and starting the Flask backend |
| backend tests | `pytest` | Runs backend pytest suite (from backend/, includes the health check test) |
| backend lint | `ruff check .` | Lints the backend Python code with Ruff |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Browser blocks frontend calls to the backend with a CORS error | Set ALLOWED_ORIGINS on the backend to include the frontend's origin (e.g. http://localhost:5173 for the Vite dev server) |
| pytest fails with an import error for 'app' when run from backend/ | Run pytest from the backend/ directory so pytest.ini's pythonpath = . setting puts backend/ on sys.path |
| Playwright e2e tests fail to launch a browser | Run npm run test:e2e:install first to fetch the Chromium browser |
| Backend won't connect to a database | By default it uses local SQLite (sqlite:///./app.db) with no setup needed; set DATABASE_URL to point at the Postgres container started via docker compose up db if you need Postgres |
<!-- sdlc:auto:end troubleshooting -->
