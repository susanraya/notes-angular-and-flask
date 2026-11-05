import { expect, test } from "@playwright/test";

// These tests exercise the real backend/Postgres (no mocked API), per the board's own
// "no live sync, reload to see changes" model, same as the other e2e specs in this
// project. The API runs on its own origin (see playwright.config.ts's webServer), so
// backend-contract assertions go straight to it through Playwright's `request` fixture
// rather than through the SPA.
const API_BASE_URL = process.env.E2E_API_BASE_URL ?? "http://127.0.0.1:8000";

test("[AC-008] visitor opens the board and reads every note's title and plain-text content", async ({
  page,
  request,
}) => {
  const stamp = Date.now();
  const titledTitle = `E2E read title ${stamp}`;
  const titledBody = `E2E read body ${stamp}`;
  const untitledBody = `E2E untitled body ${stamp}`;

  await page.goto("/");

  // Post one note with a title and one with none, through the UI a visitor would use.
  await page
    .getByLabel(/title \(optional\)/i)
    .first()
    .fill(titledTitle);
  await page.getByLabel(/note text \(required, plain text only\)/i).fill(titledBody);
  await page.getByRole("button", { name: /post note/i }).click();
  await expect(page.getByText(titledBody)).toBeVisible();

  await page.getByLabel(/note text \(required, plain text only\)/i).fill(untitledBody);
  await page.getByRole("button", { name: /post note/i }).click();
  await expect(page.getByText(untitledBody)).toBeVisible();

  // A visitor opening the board afresh (a real reload, a real fetch) sees both notes:
  // the titled one with its title, the untitled one with a placeholder, and both with
  // their plain-text body -- AC-008 in full, not just "something got posted".
  await page.reload();
  await expect(page.getByText(titledTitle)).toBeVisible();
  await expect(page.getByText(titledBody)).toBeVisible();
  await expect(page.getByText(untitledBody)).toBeVisible();
  await expect(page.getByText("(No title)").first()).toBeVisible();

  // Confirms the same thing through the API contract the UI is built on: both notes
  // exist server-side with the fields the api_spec promises, title included only when set.
  const listing = (await (await request.get(`${API_BASE_URL}/api/notes`)).json()) as Array<{
    title: string | null;
    body: string;
  }>;
  const titled = listing.find((n) => n.body === titledBody);
  const untitled = listing.find((n) => n.body === untitledBody);
  expect(titled?.title).toBe(titledTitle);
  expect(untitled?.title ?? null).toBeNull();
});

test("[AC-009] visitor sees the empty-state message when no notes exist on the board", async ({
  page,
  request,
}) => {
  // The board has no reset endpoint and is shared, so the closest a client gets to "no
  // notes exist" is clearing every note it can currently see before opening the board.
  const existing = (await (await request.get(`${API_BASE_URL}/api/notes`)).json()) as Array<{
    id: string | number;
  }>;
  for (const note of existing) {
    await request.delete(`${API_BASE_URL}/api/notes/${note.id}`);
  }

  const emptyCheck = await request.get(`${API_BASE_URL}/api/notes`);
  expect(emptyCheck.ok()).toBeTruthy();
  expect(await emptyCheck.json()).toEqual([]);

  await page.goto("/");
  await expect(page.getByText(/no notes yet/i)).toBeVisible();
  await expect(page.locator("ul li")).toHaveCount(0);
});
