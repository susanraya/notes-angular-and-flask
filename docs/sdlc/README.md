# notes angular and flask — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
a simple notes app without login page

**Documentation version:** v8
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 13 entries |
| [Development](development/README.md) | 8 entries |
| [Testing](testing/README.md) | 2 entries |
| [Deployment](deployment/README.md) | 0 entries |
| [Maintenance](maintenance/README.md) | 0 entries |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 3 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 7 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 63 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 11 requirements |
| [Changelog](CHANGELOG.md) | 8 versions |
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

- Input does not provide an explicit field mapping each backlog item to a sprint; sprint membership below is inferred from each sprint's goal text, not an explicit assignment table.
- Compliance framing (IT Intermediary Rules 2021) is stated only at the sprint-goal level; no separate compliance sign-off or legal review record was provided in this input.
- Run status says 'completed' but no ticket-level delivery evidence was provided for US-001, US-002, US-003 (+ T1/T2/T3), US-004, US-005, US-006, US-007, US-009, or US-011 (+ T1/T2/T3) -- their implementation status cannot be confirmed from this input.
- US-008 and US-010 both cite the exact same commit hash; it is unclear whether this reflects a single combined commit covering both tickets or a data duplication/reporting error -- flagging rather than assuming either explanation.
- No per-task (T1/T2/T3) delivery confirmation was provided -- only the parent story US-008 is marked delivered.
- Shares the identical commit hash with US-008's delivery record -- see DEV-RUN-STATUS gap for discrepancy note.

### Testing

- No ticket reference for this check run.
- The nature/content of the '4 checks' is not specified in the input.
- No link provided between these checks and specific requirement IDs (US-001..US-011).
- AC-017 and AC-018 are not present in the known requirement key list (US-001..US-011); cannot trace these acceptance criteria back to a specific US-id without additional mapping input -- flagging as a possible discrepancy for confirmation.
- No broader test-suite run/result (pass/fail counts) reported for this ticket beyond 'succeeded' -- unclear if these new/extended tests were actually executed and passing, or only authored.
- Backend test coverage for the POST /api/notes/{id}/report contract (beyond the e2e check) is not separately confirmed.
<!-- sdlc:auto:end open-gaps -->
