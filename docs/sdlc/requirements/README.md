# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-TECHSTACK · approved · source: requirements:technology-stack

Product owner approved a fixed technology stack for this lightweight notes app; it must be designed against exactly these choices.

Backend: Flask 3.0. Cloud: AWS, specifically the Mumbai (ap-south-1) region, chosen so the app and its notes data stay hosted in India per the data-residency requirement; stated as platform default, sufficient for the modest expected concurrent audience. Database: PostgreSQL 16, holding one shared table (title, text, timestamps, reported flag), chosen for reliable wiki-style shared editing and because it can be hosted in an India region. Frontend: Angular 22. Requirements version 1, delivery scope marked 'lightweight'.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005

- ⚠ No architecture phase input yet to confirm this stack has been translated into an actual system design or deployment configuration.

### EPIC-001 · draft · source: requirements:EPIC-001

Defines open, login-free access to a single shared public notes board for all visitors.

US-001 (critical): visitors open the application URL and the shared board loads directly, with no login, sign-up, or authentication page shown (AC-001); no email, password, account, or personal information is ever requested or collected during any action (AC-002). US-002 (critical): every visitor sees the same single shared set of notes rather than a private or per-user board (AC-003). Stated assumption: because no accounts, consent flows, or personal-data collection occur, DPDP Act 2023 account/consent machinery is treated as not required. DPDP Act 2023 (notice & consent, data-principal rights): this requirement set's own assumption is that these obligations are not triggered because no personal data is collected by the platform itself.

**Related:** US-001, US-002, AC-001, AC-002, AC-003

- ⚠ No architecture, development, or test evidence yet confirms this behavior is actually implemented.
- ⚠ Confirm whether free-text note content could itself contain personal data about a third party (e.g., a name), which would reopen DPDP notice/consent questions despite the no-accounts design.

### EPIC-002 · draft · source: requirements:EPIC-002

Covers wiki-style create, read, edit, and delete of plain-text notes by any visitor, including notes created by others.

US-003 (critical) Create: a visitor enters plain text and an optional title and submits; the note is saved and appears on the board for everyone (AC-004). A note with no title but body text saves successfully (AC-005). A note with no body text is blocked with a 'content is required' message (AC-006). Only plain text and optional title are stored - formatting, attachments, tags, and folders are explicitly out of scope and not persisted even if supplied (AC-007). US-004 (critical) Read: all existing notes are shown with title (if any) and body text (AC-008); if none exist, an empty-state message says there are no notes yet (AC-009). US-005 (critical) Edit: any visitor can edit any note's title or body, including notes made by others, and the saved revision is shown to everyone regardless of original author (AC-010). Clearing all body text and saving is blocked with the same 'content required' message (AC-011). No previous-version history, edit log, or undo is kept after a save (AC-012). US-006 (high) Delete: any visitor can delete any note, including others' notes, removing it from the board for everyone (AC-013). A confirmation step must be shown before permanent deletion since there is no undo (AC-014). Assumptions stated: no search/filter, no versioning/history, and no undo in v1.

**Related:** US-003, US-004, US-005, US-006, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009, AC-010, AC-011, AC-012, AC-013, AC-014

- ⚠ No architecture, development, or test evidence yet confirms any of these behaviors are implemented.

### EPIC-003 · draft · source: requirements:EPIC-003

Defines that the board updates on page refresh/reload rather than via live real-time sync.

US-007 (medium): when another visitor creates, edits, or deletes a note, a visitor sees the current state only after reloading or reopening the board (AC-015). If no refresh happens, the view is not required to update live - real-time sync is explicitly out of scope for v1 (AC-016). This matches the accepted-risk NFR-005 (performance), justified by an expected modest concurrent audience.

**Related:** US-007, AC-015, AC-016, NFR-005

- ⚠ No architecture or implementation detail yet on how/when the frontend fetches current state (e.g., on load only vs. polling).

### EPIC-004 · draft · source: requirements:EPIC-004

Provides a basic report/removal mechanism and visible grievance/contact information for objectionable content, intended to align with the IT (Intermediary) Rules 2021.

IT Act 2000 / IT (Intermediary) Rules 2021: control addressed here is the platform's basic content-moderation due diligence - a report option, an acknowledgement, published grievance/contact information, and a removal path. US-008 (high): a visitor can select a report option on any note; the report is recorded and the visitor sees an acknowledgement, with no login or personal information required (AC-017, AC-018). US-009 (medium): grievance or contact information for the platform must be accessible from the interface so visitors can escalate concerns (AC-019). US-010 (high): a reported or otherwise objectionable note can be removed via the available delete/removal mechanism so it no longer appears to any visitor (AC-020). Stated assumption: a basic report/remove mechanism is sufficient; no login, accounts, or DPDP consent flows are needed since no personal data is collected.

**Related:** US-008, US-009, US-010, AC-017, AC-018, AC-019, AC-020, NFR-003

- ⚠ IT (Intermediary) Rules 2021 generally expects a named Grievance Officer with published contact details and defined response timelines; requirements only mention generic 'grievance/contact information' without specifics - recommend confirming with legal/compliance.
- ⚠ No SLA or process is defined for how quickly reported notes get reviewed or removed.
- ⚠ No architecture/development/test evidence yet confirms this is implemented.

### EPIC-005 · draft · source: requirements:EPIC-005

Establishes that all notes data must be hosted on infrastructure in India, with sector-specific localisation and DPDP consent machinery deemed inapplicable.

Data residency & transfers: US-011 (high) requires notes data to be stored on infrastructure located in India at all times notes are created, edited, or deleted (AC-021), realized via the approved AWS ap-south-1 (Mumbai) region and an India-hostable PostgreSQL 16 instance. AC-022 explicitly states that because this is a general-purpose notes tool with no personal accounts or payments, no RBI/SEBI/IRDAI sector-localisation rules apply and full DPDP consent/account machinery is not applied - consistent with agreed scope. Stated assumption: no payments or monetisation.

**Related:** US-011, AC-021, AC-022, NFR-002

- ⚠ No architecture or deployment evidence yet confirms the app and database are actually provisioned in ap-south-1.
- ⚠ Confirm the assumption that notes never contain personal data, since note bodies are free text and could incidentally include third-party personal information, which would affect the DPDP inapplicability conclusion.

### NFR-001 · draft · source: requirements:NFR-001

No personal data is collected anywhere in the system.

DPDP Act 2023: notice-and-consent and data-principal-rights machinery is treated as not triggered because no email, password, account, or personal information is requested or collected when a visitor reads, creates, edits, deletes, or reports a note. Applies to the whole system.

**Related:** EPIC-001, US-001

- ⚠ Not independently verified against the possibility that note text itself contains personal data about a third party.

### NFR-002 · draft · source: requirements:NFR-002

Notes data must be stored on India-based infrastructure at all times.

Data residency & transfers: all notes data must be stored on infrastructure located in India whenever notes are created, edited, or deleted, in line with the agreed data-residency position (AWS ap-south-1). Applies to US-011.

**Related:** US-011, EPIC-005

- ⚠ No deployment record yet confirming the region configuration is actually in place.

### NFR-003 · draft · source: requirements:NFR-003

App must provide basic report/remove and grievance-contact functionality to align with IT (Intermediary) Rules 2021.

IT (Intermediary) Rules 2021: basic mechanism to report and remove objectionable notes and make grievance/contact information available. Explicitly states full DPDP account/consent machinery and sector-regulator (RBI/SEBI/IRDAI) localisation do not apply since no personal data or payments are involved. Applies to US-008, US-009, US-010.

**Related:** US-008, US-009, US-010, EPIC-004

- ⚠ Specific grievance officer identity/contact details and response-time commitments are not documented.

### NFR-004 · draft · source: requirements:NFR-004

Accepted risk: open wiki-style access means any visitor can edit or delete any note, with no ownership or access control.

The board is intentionally open and wiki-style: any visitor can edit or delete any note, including notes created by others, with no ownership, login, or access control. The risk that anyone can change or remove any content is explicitly accepted by the requirements. Applies to US-005, US-006.

**Related:** US-005, US-006

- ⚠ No mitigation (e.g., rate limiting, abuse monitoring) documented beyond acceptance of the risk.

### NFR-005 · draft · source: requirements:NFR-005

Accepted risk: no real-time sync - changes only appear after refresh.

Changes made by one visitor become visible to others only when the page is refreshed or reopened; live real-time synchronisation is not provided. Accepted because a modest concurrent audience is expected. Applies to US-007.

**Related:** US-007, EPIC-003

### NFR-006 · draft · source: requirements:NFR-006

Accepted risk: no version history or undo - edits and deletions are permanent.

No previous-version history, edit log, or undo is retained for notes; edits and deletions are permanent. This limitation is accepted for the first version. Applies to US-005, US-006.

**Related:** US-005, US-006

### NFR-007 · draft · source: requirements:NFR-007

Accepted risk: system is designed only for a modest concurrent audience, not high-concurrency or large-scale usage.

The board is designed only for a modest concurrent audience and is not built for high-concurrency or large-scale usage. Applies to the whole system.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-05

**Capabilities in scope:** Single shared public notes board, Create a note with plain text and optional title, Read all notes on the board, Edit any note on the board (wiki-style), Delete any note on the board, Open access without login or sign-up, Plain-text notes with optional title; no attachments or tags, Updates appear on page refresh, not live real-time sync

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | Flask | — |
| cloud | AWS | You require data to be hosted in India; AWS runs the Mumbai (ap-south-1) region, so the app and its notes stay in-country as the brief demands. It's the platform default and comfortably handles the modest concurrent audience you described. |
| database | PostgreSQL | One shared table of notes (title, text, timestamps, a reported flag) is all this app stores. PostgreSQL holds that reliably and lets anyone edit any row wiki-style without fuss, and it can be hosted in an India region to meet your data-residency requirement. |
| frontend | Angular | — |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Open Access to the Shared Public Notes Board

Anyone visiting the site can use a single shared public notes board without signing in, registering, or providing any personal information. There is no login or authentication page. All visitors interact with the same one set of notes (wiki-style). Assumption: no accounts, consent flows or personal-data collection are involved, so DPDP account/consent machinery is not required.

### US-001: Access the board without logging in

**Priority:** critical

> As a visitor to the site, I want to open the notes board directly without signing in or registering, so that I can start reading and posting notes immediately with no barrier.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | a visitor opens the application URL | the page loads | the shared notes board is displayed without presenting any login, sign-up, or authentication page |
| AC-002 | a visitor is using the board | they create, edit, or delete notes | no email, password, account, or personal information is requested or collected at any point |

### US-002: See the single shared board everyone uses

**Priority:** critical

> As a visitor to the site, I want to see the one shared public board that all other visitors also see, so that everyone is collaborating on the same set of notes.

| ID | Given | When | Then |
|---|---|---|---|
| AC-003 | notes exist on the board | any visitor opens the application | they see the same single shared set of notes that all other visitors see, not a private or per-user board |

## EPIC-002: Create, Read, Edit and Delete Notes (Wiki-style)

Any visitor can create new plain-text notes, read all existing notes, and edit or delete any note on the board including notes created by others (wiki-style). Assumption: notes are plain text with an optional title; no attachments, rich formatting, folders, or tags in v1. Assumption: no search/filtering, no versioning/edit history, and no undo in v1 given the 'simple' brief.

### US-003: Create a note

**Priority:** critical

> As a visitor to the board, I want to create a new note with plain text and an optional title, so that I can post content to the shared board.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | a visitor is on the board | they enter plain-text content (and optionally a title) and submit the new note | the note is saved and appears on the shared board for all visitors |
| AC-005 | a visitor is creating a note | they leave the title empty but provide body text | the note is saved successfully with no title |
| AC-006 | a visitor is creating a note | they submit with no body text | the system prevents creation of an empty note and shows a message indicating content is required |
| AC-007 | a visitor is creating a note | they include formatting, file attachments, tags, or folders | only plain text and an optional title are stored, as rich formatting, attachments, tags, and folders are out of scope for v1 |

### US-004: Read all notes on the board

**Priority:** critical

> As a visitor to the board, I want to view all existing notes on the shared board, so that I can read what others have posted.

| ID | Given | When | Then |
|---|---|---|---|
| AC-008 | one or more notes exist on the board | a visitor opens the board | all existing notes are displayed with their title (if any) and plain-text content |
| AC-009 | no notes exist on the board | a visitor opens the board | an empty-state message is shown indicating there are no notes yet |

### US-005: Edit any note

**Priority:** critical

> As a visitor to the board, I want to edit any note on the board, including notes created by others, so that the board can be collaboratively maintained wiki-style.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | a note exists on the board | a visitor edits its title or plain-text content and saves | the note is updated and the revised version is shown to all visitors, regardless of who originally created it |
| AC-011 | a visitor is editing a note | they clear all body text and try to save | the system prevents saving an empty note and shows a message indicating content is required |
| AC-012 | a visitor has edited a note | the edit is saved | no previous-version history, edit log, or undo is retained, as versioning and undo are out of scope for v1 |

### US-006: Delete any note

**Priority:** high

> As a visitor to the board, I want to delete any note on the board, including notes created by others, so that obsolete or unwanted notes can be removed wiki-style.

| ID | Given | When | Then |
|---|---|---|---|
| AC-013 | a note exists on the board | a visitor deletes it | the note is removed from the shared board for all visitors, regardless of who created it |
| AC-014 | a visitor chooses to delete a note | the delete action is triggered | a confirmation step is presented before the note is permanently removed, since there is no undo in v1 |

## EPIC-003: Update Visibility on Refresh

Because the expected audience is modest and the app is intentionally simple, changes made by one visitor become visible to others when they refresh or reload the page, rather than through live real-time synchronisation. Assumption: no real-time push/sync in v1.

### US-007: See others' changes on refresh

**Priority:** medium

> As a visitor to the board, I want to see notes created, edited, or deleted by others when I reload the page, so that I can view an up-to-date board without needing live updates.

| ID | Given | When | Then |
|---|---|---|---|
| AC-015 | another visitor has created, edited, or deleted a note | a visitor reloads or reopens the board | the board reflects the current state including the other visitor's changes |
| AC-016 | another visitor changes a note while I am viewing the board | I have not refreshed the page | my view is not required to update live, as real-time sync is out of scope for v1 |

## EPIC-004: Report and Remove Objectionable Notes

As a public platform hosting content posted by anonymous visitors in India, the app provides a basic mechanism to report and remove objectionable notes to stay aligned with the IT (Intermediary) Rules 2021. Assumption: a basic report/remove mechanism is sufficient; no login, accounts, or DPDP consent flows are needed since no personal data is collected.

### US-008: Report an objectionable note

**Priority:** high

> As a visitor to the board, I want to report a note I find objectionable, so that the platform can review and remove content that violates content rules under the IT (Intermediary) Rules 2021.

| ID | Given | When | Then |
|---|---|---|---|
| AC-017 | a note exists on the board | a visitor selects the report option on that note | the report is recorded and the visitor sees an acknowledgement that the note has been reported |
| AC-018 | a visitor reports a note | the report is submitted | no login or personal information is required to submit the report |

### US-009: Make contact/grievance information available

**Priority:** medium

> As a visitor to the board, I want to find how to raise a grievance or contact the platform about objectionable content, so that the platform meets the grievance-contact expectation of the IT (Intermediary) Rules 2021.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | a visitor is on the board | they look for how to report or escalate objectionable content | contact or grievance information for the platform is accessible from the interface |

### US-010: Remove a reported or objectionable note

**Priority:** high

> As a platform operator, I want reported or objectionable notes to be removable from the board, so that the platform can act on objectionable content in line with the IT (Intermediary) Rules 2021.

| ID | Given | When | Then |
|---|---|---|---|
| AC-020 | a note has been reported or identified as objectionable | it is removed via the available delete/removal mechanism | the note no longer appears on the shared board for any visitor |

## EPIC-005: India Data Hosting and Compliance Boundaries

Notes data is hosted in India. Because this is a general-purpose public notes app with no accounts and no personal-data collection, no sector-regulator localisation (RBI/SEBI/IRDAI) applies and full DPDP account/consent machinery is not required. Assumption: no payments or monetisation (free public tool).

### US-011: Host notes data in India

**Priority:** high

> As a platform operator, I want all notes data to be stored on infrastructure located in India, so that the app aligns with the agreed India data-residency position.

| ID | Given | When | Then |
|---|---|---|---|
| AC-021 | the application is deployed | notes are created, edited, or deleted | the underlying notes data is stored on infrastructure hosted in India |
| AC-022 | the app is a general-purpose notes tool with no personal accounts or payments | data-residency requirements are assessed | no RBI/SEBI/IRDAI sector-localisation rules and no DPDP consent/account machinery are applied, consistent with the agreed scope |
<!-- sdlc:auto:end epics -->
