import { expect, test } from "@playwright/test";

// These tests exercise the real backend/Postgres (no mocked API), per the board's own
// "no live sync, reload to see changes" model: each test posts a note through the UI,
// acts on it, then reloads the page to confirm the change is visible to a fresh load.

async function postNote(page, title: string, body: string) {
  await page.goto("/");
  await page
    .getByLabel(/title \(optional\)/i)
    .first()
    .fill(title);
  await page.getByLabel(/note text \(required, plain text only\)/i).fill(body);
  await page.getByRole("button", { name: /post note/i }).click();
  await expect(page.getByText(`Posted "${title}"`)).toBeVisible();
}

test("[AC-010] editing a note in the UI and saving shows the revised note after a page reload", async ({
  page,
}) => {
  const title = `E2E edit ${Date.now()}`;
  const body = `original body ${Date.now()}`;
  await postNote(page, title, body);

  await page.getByRole("button", { name: /edit note/i }).click();
  const editBody = page.getByLabel(/note text \(required\)/i);
  await editBody.fill("");
  const newBody = `revised body ${Date.now()}`;
  await editBody.fill(newBody);
  await page.getByRole("button", { name: /save changes/i }).click();

  await expect(page.getByText(newBody)).toBeVisible();

  await page.reload();
  await expect(page.getByText(newBody)).toBeVisible();
  await expect(page.getByText(body)).toHaveCount(0);
});

test("[AC-011] clearing the body in the edit form and saving shows the required-content message and does not change the note after reload", async ({
  page,
}) => {
  const title = `E2E empty ${Date.now()}`;
  const body = `keep this body ${Date.now()}`;
  await postNote(page, title, body);

  await page.getByRole("button", { name: /edit note/i }).click();
  const editBody = page.getByLabel(/note text \(required\)/i);
  await editBody.fill("   ");
  await page.getByRole("button", { name: /save changes/i }).click();

  await expect(page.getByText(/note text is required/i)).toBeVisible();

  await page.reload();
  await expect(page.getByText(body)).toBeVisible();
});

test("[AC-013, AC-014] choosing delete shows a confirmation step; cancelling keeps the note, confirming removes it and it stays gone after reload", async ({
  page,
}) => {
  const title = `E2E delete ${Date.now()}`;
  const body = `to be deleted ${Date.now()}`;
  await postNote(page, title, body);

  // Open the note and ask to delete it: a confirmation dialog appears first.
  await page.getByRole("button", { name: /delete note/i }).click();
  const dialog = page.getByRole("dialog", { name: /delete this note permanently/i });
  await expect(dialog).toBeVisible();

  // Cancelling keeps the note.
  await dialog.getByRole("button", { name: /cancel/i }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByText(body)).toBeVisible();

  // Confirming removes it, including after a reload.
  await page.getByRole("button", { name: /delete note/i }).click();
  await page
    .getByRole("dialog", { name: /delete this note permanently/i })
    .getByRole("button", { name: /delete note/i })
    .click();
  await expect(page.getByText(body)).toHaveCount(0);

  await page.reload();
  await expect(page.getByText(body)).toHaveCount(0);
});
