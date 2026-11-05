import { expect, test } from "@playwright/test";

// Proves the board's own documented model: changes made through the API (standing in for
// another visitor) while this page is already open are NOT reflected until the page is
// reloaded (AC-016), and ARE reflected correctly once it is (AC-015). Seeds/mutates
// directly against the real backend via the `request` fixture -- no mocking.
const API_BASE_URL = process.env.E2E_API_BASE_URL ?? "http://127.0.0.1:8000";

test("[AC-015][AC-016] a note created, edited and deleted via the API while the page is open only appears after reload, not before", async ({
  page,
  request,
}) => {
  const stamp = Date.now();

  const toEdit = (
    await (
      await request.post(`${API_BASE_URL}/api/notes`, {
        data: { title: `edit-me ${stamp}`, body: `original body ${stamp}` },
      })
    ).json()
  ) as { id: number | string; body: string };

  const toDelete = (
    await (
      await request.post(`${API_BASE_URL}/api/notes`, {
        data: { title: `delete-me ${stamp}`, body: `will vanish ${stamp}` },
      })
    ).json()
  ) as { id: number | string; body: string };

  // Visitor opens the board: sees both notes as they stood when the page loaded.
  await page.goto("/");
  await expect(page.getByText(toEdit.body)).toBeVisible();
  await expect(page.getByText(toDelete.body)).toBeVisible();

  // While the page stays open, another client (the API here) creates, edits and deletes.
  const newBody = `created elsewhere ${stamp}`;
  await request.post(`${API_BASE_URL}/api/notes`, {
    data: { title: `created-elsewhere ${stamp}`, body: newBody },
  });
  const editedBody = `edited elsewhere ${stamp}`;
  await request.put(`${API_BASE_URL}/api/notes/${toEdit.id}`, {
    data: { title: `edit-me ${stamp}`, body: editedBody },
  });
  await request.delete(`${API_BASE_URL}/api/notes/${toDelete.id}`);

  // [AC-016] Nothing changes on this open page before a reload: the old content is still
  // there, the new content is not.
  await expect(page.getByText(toEdit.body)).toBeVisible();
  await expect(page.getByText(toDelete.body)).toBeVisible();
  await expect(page.getByText(newBody)).toHaveCount(0);
  await expect(page.getByText(editedBody)).toHaveCount(0);

  // [AC-015] A reload picks up every change made elsewhere: created note appears, edited
  // note shows its new body (old body gone), deleted note is gone.
  await page.reload();
  await expect(page.getByText(newBody)).toBeVisible();
  await expect(page.getByText(editedBody)).toBeVisible();
  await expect(page.getByText(toEdit.body)).toHaveCount(0);
  await expect(page.getByText(toDelete.body)).toHaveCount(0);
});
