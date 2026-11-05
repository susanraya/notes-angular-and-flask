# notes angular and flask — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
a simple notes app without login page

**Documentation version:** v6
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 13 entries |
| [Development](development/README.md) | 10 entries |
| [Testing](testing/README.md) | 0 entries |
| [Deployment](deployment/README.md) | 0 entries |
| [Maintenance](maintenance/README.md) | 0 entries |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 3 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 7 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 58 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 11 requirements |
| [Changelog](CHANGELOG.md) | 6 versions |
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

- Plan input lists sprints and backlog items separately with no explicit per-item sprint assignment; the mapping above is inferred from sprint goal wording, not stated directly in the input.
- Development run output reports no delivered ticket for US-001, US-003 (or its tasks US-003-T1/T2/T3), or US-011 (or its tasks US-011-T1/T2/T3), even though overall run status is 'completed' -- actual delivery status of this sprint's scope is unconfirmed.
- Plan input does not explicitly assign items to sprints; mapping above is inferred from goal wording.
- All items in this sprint do have matching delivered tickets in the dev run output, which is consistent with this sprint's scope.
- Development run output reports no delivered ticket for US-008 (or its tasks US-008-T1/T2/T3) or US-010, even though overall run status is 'completed' -- actual delivery status of this sprint's scope (the IT Intermediary Rules 2021 compliance work) is unconfirmed and should be verified given its regulatory relevance.
- Conflict: overall run status says 'completed' but roughly half the planned story points (including all of Sprint 1's and Sprint 3's inferred scope) have no corresponding delivered ticket -- needs reconciliation with the dev team or run log before this phase can be marked complete.
- No evidence in the input as to whether US-001, US-003, US-008, US-010, US-011 are still in progress, blocked, or simply omitted from this report.
- Commit 68a2583c... is also cited for US-004 and US-007, suggesting these three stories may have been delivered together in one change; the input does not confirm whether they were implemented as a single combined commit or separately.
- Same commit hash as US-002 and US-007; unclear from input whether this reflects one bundled change or three independently-tracked but identically-hashed deliveries.
- Same commit hash as US-006; likely delivered together, not confirmed explicitly by input.
- Same commit hash as US-005; likely delivered together, not confirmed explicitly by input.
- Same commit hash as US-002 and US-004; unclear from input whether this reflects one bundled change or three independently-tracked but identically-hashed deliveries.
<!-- sdlc:auto:end open-gaps -->
