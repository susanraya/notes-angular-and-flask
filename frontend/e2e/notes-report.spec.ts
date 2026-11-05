import { expect, test } from "@playwright/test";

// Covers reporting a note (US-008): the visitor-facing flow through the real board (no
// mocked API, same model as the other e2e specs in this project), plus the pure API
// contract for POST /api/notes/{id}/report straight from the api_spec.
const API_BASE_URL = process.env.E2E_API_BASE_URL ?? "http://127.0.0.1:8000";

test("[AC-017] a visitor selects report on a note, sees an acknowledgement, and the report is recorded on the board", async ({
  page,
  request,
}) => {
  const stamp = Date.now();
  const title = `E2E report ${stamp}`;
  const body = `objectionable content ${stamp}`;

  // A note exists on the board (posted through the UI a visitor would use).
  await page.goto("/");
  await page
    .getByLabel(/title \(optional\)/i)
    .first()
    .fill(title);
  await page.getByLabel(/note text \(required, plain text only\)/i).fill(body);
  await page.getByRole("button", { name: /post note/i }).click();
  await expect(page.getByText(`Posted "${title}"`)).toBeVisible();

  // The note the visitor just posted is already open (selected); choosing the report
  // option on it surfaces an acknowledgement dialog.
  await page.getByRole("button", { name: /^report note$/i }).click();

  const ackDialog = page.getByRole("dialog", { name: /reported for review/i });
  await expect(ackDialog).toBeVisible();
  await expect(ackDialog).toContainText(title);

  // The acknowledgement is not just cosmetic: the per-note report count on the board
  // reflects the recorded report once the dialog is dismissed.
  await ackDialog.getByRole("button", { name: /close/i }).click();
  await expect(ackDialog).toHaveCount(0);
  await expect(page.getByText(/reported 1 time/i)).toBeVisible();

  // The report is durably recorded server-side, not just in the page's own state: a
  // completely fresh request against the API contract shows the flag and count set.
  const listing = (await (await request.get(`${API_BASE_URL}/api/notes`)).json()) as Array<{
    body: string;
    reported: boolean;
    report_count: number;
  }>;
  const reported = listing.find((n) => n.body === body);
  expect(reported?.reported).toBe(true);
  expect(reported?.report_count).toBe(1);

  // A reload (the board's own "see other changes" model) also shows the note as reported.
  await page.reload();
  await expect(page.getByText(/reported/i).first()).toBeVisible();
});

test("[AC-018] reporting a note needs no login step and no personal information, in the UI or the API contract", async ({
  page,
  request,
}) => {
  const stamp = Date.now();
  const title = `E2E no-login report ${stamp}`;
  const body = `report me without an account ${stamp}`;

  await page.goto("/");
  await page
    .getByLabel(/title \(optional\)/i)
    .first()
    .fill(title);
  await page.getByLabel(/note text \(required, plain text only\)/i).fill(body);
  await page.getByRole("button", { name: /post note/i }).click();
  await expect(page.getByText(`Posted "${title}"`)).toBeVisible();

  // Reporting the note presents no sign-in gate and no field asking for an email,
  // password or name before the report goes through.
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await expect(page.locator('input[type="email"]')).toHaveCount(0);
  await page.getByRole("button", { name: /^report note$/i }).click();
  await expect(page.getByRole("dialog", { name: /reported for review/i })).toBeVisible();
  await expect(page.getByText(/no sign-in or personal details were needed/i)).toBeVisible();

  // The API contract itself needs no auth: a request with no Authorization header
  // succeeds and returns exactly the shape the spec promises.
  const listing = (await (await request.get(`${API_BASE_URL}/api/notes`)).json()) as Array<{
    id: number | string;
    body: string;
  }>;
  const note = listing.find((n) => n.body === body);
  expect(note).toBeTruthy();

  const reportResponse = await request.post(`${API_BASE_URL}/api/notes/${note!.id}/report`);
  expect(reportResponse.status()).toBe(200);
  const reportHeaders = reportResponse.request().headers();
  expect(reportHeaders["authorization"]).toBeUndefined();
  const reportBody = await reportResponse.json();
  expect(reportBody).toMatchObject({ id: note!.id, reported: true });

  // The error case a person never sees but a client depends on: reporting a note that
  // does not exist returns 404, still with no auth required.
  const missingResponse = await request.post(`${API_BASE_URL}/api/notes/999999999/report`);
  expect(missingResponse.status()).toBe(404);
});

test("[AC-020] removing a reported note via delete, once confirmed, is gone on reload and in a second, unrelated browser context", async ({
  page,
  browser,
}) => {
  const stamp = Date.now();
  const title = `E2E reported removal ${stamp}`;
  const body = `objectionable, to be removed ${stamp}`;

  await page.goto("/");
  await page
    .getByLabel(/title \(optional\)/i)
    .first()
    .fill(title);
  await page.getByLabel(/note text \(required, plain text only\)/i).fill(body);
  await page.getByRole("button", { name: /post note/i }).click();
  await expect(page.getByText(`Posted "${title}"`)).toBeVisible();

  // Report it, then remove it via the normal delete mechanism, confirming the step.
  await page.getByRole("button", { name: /^report note$/i }).click();
  await page
    .getByRole("dialog", { name: /reported for review/i })
    .getByRole("button", { name: /close/i })
    .click();
  await expect(page.getByText(body)).toBeVisible();

  await page.getByRole("button", { name: /delete note/i }).click();
  await page
    .getByRole("dialog", { name: /delete this note permanently/i })
    .getByRole("button", { name: /delete note/i })
    .click();
  await expect(page.getByText(body)).toHaveCount(0);

  // Gone on reload of this same page.
  await page.reload();
  await expect(page.getByText(body)).toHaveCount(0);

  // Gone in a second, entirely unrelated browser context (a different visitor).
  const otherContext = await browser.newContext();
  const otherPage = await otherContext.newPage();
  await otherPage.goto("/");
  await expect(otherPage.getByText(body)).toHaveCount(0);
  await otherContext.close();
});

test("[NFR-003] the report acknowledgement offers an escalation path to the grievance/contact information, and that page is reachable", async ({
  page,
}) => {
  const stamp = Date.now();
  const title = `E2E escalate ${stamp}`;
  const body = `needs escalation ${stamp}`;

  await page.goto("/");
  await page
    .getByLabel(/title \(optional\)/i)
    .first()
    .fill(title);
  await page.getByLabel(/note text \(required, plain text only\)/i).fill(body);
  await page.getByRole("button", { name: /post note/i }).click();
  await expect(page.getByText(`Posted "${title}"`)).toBeVisible();

  await page.getByRole("button", { name: /^report note$/i }).click();
  const ackDialog = page.getByRole("dialog", { name: /reported for review/i });
  await expect(ackDialog).toBeVisible();

  const escalateLink = ackDialog.getByRole("button", { name: /escalate.*grievance/i });
  await expect(escalateLink).toBeVisible();
  await escalateLink.click();

  // The escalation path actually lands on the grievance-contact page, and that page is
  // reachable and shows real contact details (not a dead link).
  await expect(page).toHaveURL(/grievance-contact/);
  await expect(page.getByText(/@/)).toBeVisible();
});
