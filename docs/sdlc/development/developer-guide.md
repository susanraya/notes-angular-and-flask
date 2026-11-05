# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `9823f92` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This is a Quorq-generated "notes board" app split into two independently run pieces in one repo: an Angular 22 (Vite + Analog) frontend whose screens were reviewed and approved but currently render seeded sample data, and a Flask 3.0 backend that only has a health check and a partially-stubbed `/api/notes` REST API (SQLAlchemy models, Flask blueprints) backed by SQLite locally or PostgreSQL 16 via `DATABASE_URL`/docker-compose in other environments.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for npm/Vite/Angular 22 toolchain)
- Python 3.12
- pip
- Docker and Docker Compose (optional, for the PostgreSQL 16 service in docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. cd frontend && npm install
2. cd backend && pip install -r requirements.txt
3. (optional) from repo root, run `docker-compose up -d db` to start a local PostgreSQL 16 instance, then set DATABASE_URL to point at it; without it the backend falls back to a local SQLite file (app.db)
4. (optional) copy .env.example to .env and fill in any values it defines (e.g. ALLOWED_ORIGINS, DATABASE_URL, VITE_API_BASE_URL)
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Starts the Vite dev server for the Angular app (run from frontend/) |
| frontend build | `npm run build` | Compiles the Angular components ahead-of-time and bundles the app (run from frontend/) |
| frontend preview | `npm run preview` | Serves the production build locally (run from frontend/) |
| backend dev | `flask --app app run --debug` | Runs the Flask development server with the app factory in backend/app/__init__.py (run from backend/) |
| db up | `docker-compose up -d db` | Starts the PostgreSQL 16 database container defined in docker-compose.yml (run from repo root) |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `frontend` | Angular 22 (Vite/Analog) app: approved screens, UI library, routing shell |
| `frontend/src` | App source: screens, lib (api client, UI, icons, navigation), main bootstrap |
| `frontend/e2e` | Playwright acceptance tests |
| `backend` | Flask 3.0 API service: app factory, models, routes, services, migrations |
| `backend/app` | Application package: factory (__init__.py), database setup, models, routes, services, stub helpers |
| `backend/migrations` | SQL migration file(s) and a runner script |
| `backend/scripts` | Operational scripts, e.g. checking database connections |
| `backend/tests` | Pytest suite: health check and notes API integration tests |
| `.devcontainer` | VS Code devcontainer configuration |
| `.quorq` | Platform-internal handoff/prepared metadata for the Quorq SDLC platform |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend: one Flask Blueprint per architecture component that owns endpoints (e.g. web_spa blueprint in app/routes/web_spa.py)
- Backend: unimplemented endpoints return a standard stub via app/stubs.py's not_implemented() until real behavior is built
- Backend: SQLAlchemy 2.0 declarative models in app/models.py, all inheriting from the shared Base in app/database.py; tables created via Base.metadata.create_all on startup (no Alembic yet)
- Backend: DATABASE_URL env var selects the database; defaults to local SQLite so the app runs with no external DB
- Frontend: one component per approved screen under src/screens/, paired with an adjacent `*.spec.ts` test file
- Frontend: shared screen behavior (navigate, brand) factored into src/lib/screen-base.ts; shared UI/icons in src/lib/ui.ts and src/lib/icons.ts
- Frontend: path alias `@/*` maps to `src/*` (see tsconfig.json and vite.config.ts)
- Frontend: brand tokens centralized in src/lib/brand.ts and src/index.css as CSS variables
- Frontend: API access centralized in src/lib/api.ts (apiFetch, bearer/session token helpers); screens currently use seeded sample data, not this client, as the integration seam
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `npm test` | Runs Vitest component tests (Angular TestBed) located beside each component (run from frontend/) |
| frontend lint | `npm run lint` | Runs ESLint over the frontend app; used as a development gate (run from frontend/) |
| frontend e2e | `npm run test:e2e` | Runs Playwright acceptance tests from e2e/, building/serving the app (or hitting E2E_BASE_URL if set) and starting the backend (run from frontend/) |
| backend tests | `pytest` | Runs the backend test suite (health check, notes API integration tests) using pytest.ini config (run from backend/) |
| backend lint | `ruff check .` | Lints the backend Python code with Ruff (run from backend/) |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend API calls fail with CORS errors | The backend's CORS allowlist defaults to http://localhost:5173 and http://127.0.0.1:5173 (Vite dev server). Set ALLOWED_ORIGINS to a comma-separated list including your frontend's origin if it differs. |
| `pytest` run from backend/ fails with ImportError for `app` | pytest.ini sets pythonpath = . so `pytest` must be run from the backend/ directory; running it elsewhere breaks the import. |
| Playwright e2e tests fail to start the backend | playwright.config.ts invokes `.venv/bin/python -m flask ...` from ../backend, so create a virtualenv at backend/.venv and `pip install -r requirements.txt` into it before running `npm run test:e2e`. |
| Backend can't connect to PostgreSQL | Ensure `docker-compose up -d db` is running and DATABASE_URL points to it (e.g. postgresql+psycopg://app:app@localhost:5432/app); otherwise the backend falls back to local SQLite (app.db). |
| Frontend built app can't reach the API in a deployed-like setup | Set VITE_API_BASE_URL at build time; it defaults to http://localhost:8000 (src/lib/api.ts). |
<!-- sdlc:auto:end troubleshooting -->
