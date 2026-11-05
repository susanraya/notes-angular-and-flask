# notes angular and flask — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
a simple notes app without login page

**Documentation version:** v3
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 13 entries |
| [Development](development/README.md) | 20 entries |
| [Testing](testing/README.md) | 0 entries |
| [Deployment](deployment/README.md) | 0 entries |
| [Maintenance](maintenance/README.md) | 0 entries |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 3 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 route |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 11 requirements |
| [Changelog](CHANGELOG.md) | 3 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- No architecture phase input yet to confirm this stack has been translated into an actual system design or deployment configuration.
- No architecture, development, or test evidence yet confirms this behavior is actually implemented.
- Confirm whether free-text note content could itself contain personal data about a third party (e.g., a name), which would reopen DPDP notice/consent questions despite the no-accounts design.
- No architecture, development, or test evidence yet confirms any of these behaviors are implemented.
- No architecture or implementation detail yet on how/when the frontend fetches current state (e.g., on load only vs. polling).
- IT (Intermediary) Rules 2021 generally expects a named Grievance Officer with published contact details and defined response timelines; requirements only mention generic 'grievance/contact information' without specifics - recommend confirming with legal/compliance.
- No SLA or process is defined for how quickly reported notes get reviewed or removed.
- No architecture/development/test evidence yet confirms this is implemented.
- No architecture or deployment evidence yet confirms the app and database are actually provisioned in ap-south-1.
- Confirm the assumption that notes never contain personal data, since note bodies are free text and could incidentally include third-party personal information, which would affect the DPDP inapplicability conclusion.
- Not independently verified against the possibility that note text itself contains personal data about a third party.
- No deployment record yet confirming the region configuration is actually in place.
- Specific grievance officer identity/contact details and response-time commitments are not documented.
- No mitigation (e.g., rate limiting, abuse monitoring) documented beyond acceptance of the risk.

### Architecture

- Specific US-xxx mapping for each SPA capability is not explicitly given in the input; mapping above is inferred from feature description, not stated directly.
- AC-006 and AC-007 are not mapped to a specific US-xxx key in the provided input.
- AC-008/AC-009/AC-015 not mapped to specific US-xxx keys in the provided input.
- AC-011, AC-012 and NFR-006 are not mapped to a specific US-xxx key in the provided input.
- AC-013, AC-014, AC-020 are not mapped to a specific US-xxx key in the provided input.
- Input distinguishes 'visitor or operator' for deletion but no operator/role concept is defined elsewhere in the architecture (system has no authentication layer) -- flagged as a possible discrepancy worth confirming.
- AC-017, AC-018, NFR-003 are not mapped to a specific US-xxx key in the provided input.

### Development

- No development execution status (commits, code, PRs, ticket completion) was provided for this phase; only the sprint backlog breakdown is available.
- No explicit dates for sprint start/end were given.
- Input does not explicitly list which backlog items are assigned to this sprint; only the goal narrative is given, so item-to-sprint mapping is unconfirmed.
- The specific provisions of the IT Intermediary Rules 2021 being targeted are not detailed in the input beyond 'reporting and removal' -- full regulatory scope is unconfirmed.
- No epic-level owner/role assigned.
- No completion status provided.
- No implementation evidence (code, ticket status) provided; only backlog assignment is known.
- No implementation or test evidence provided for the schema, API endpoint, or UI form tasks; only task assignments are known.
- Input does not clarify whether edit permissions are restricted in any way; story title suggests any user can edit any note.
- Input does not clarify whether delete permissions are restricted in any way.
- Input confirms refresh-based (not real-time/live) updates per Sprint 2 goal, but no implementation confirmation is given.
- Scope of IT Intermediary Rules 2021 compliance is stated only at the goal-narrative level; no detailed regulatory requirement mapping was provided to confirm full coverage.
- No implementation or test evidence provided for the schema, endpoint, or UI tasks; only task assignments are known.
- Content of the grievance/contact information itself is not specified in the input.
- Input does not specify who has authority to remove a reported note (e.g. moderator vs. any user).
- 'Compliance boundaries' in the epic title are not further detailed beyond data hosting location in the input.
- No implementation or deployment evidence provided for provisioning, deployment, or network/security configuration tasks; only task assignments are known.
- No deployment phase input exists yet to confirm these infrastructure tasks were actually completed.
<!-- sdlc:auto:end open-gaps -->
