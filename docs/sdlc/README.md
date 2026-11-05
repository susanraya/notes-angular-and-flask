# notes angular and flask — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
a simple notes app without login page

**Documentation version:** v4
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 13 entries |
| [Development](development/README.md) | 5 entries |
| [Testing](testing/README.md) | 0 entries |
| [Deployment](deployment/README.md) | 0 entries |
| [Maintenance](maintenance/README.md) | 0 entries |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 3 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 6 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 20 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 11 requirements |
| [Changelog](CHANGELOG.md) | 4 versions |
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

- No individual delivery confirmation for sub-tasks US-003-T1, US-003-T2, US-003-T3 -- only the parent story US-003 is marked delivered.
- Reason for skipping US-011 is not provided in the input.
- US-011 underpins the project's India-hosting/compliance boundary goal from Sprint 1's stated plan goal; skipping it conflicts with that stated goal and with the overall dev run status of 'completed' -- flagged as a discrepancy.
- No ticket-level status provided for US-002, US-004, US-005, US-006, US-007, US-008, US-008-T1, US-008-T2, US-008-T3, US-009, US-010 despite the run being marked 'completed' -- this is a discrepancy between the declared overall run status and the partial ticket data given, and should be clarified before this phase is considered fully documented.
<!-- sdlc:auto:end open-gaps -->
