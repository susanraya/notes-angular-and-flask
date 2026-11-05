import { expect, test } from "@playwright/test";

// Covers reaching the grievance-contact screen from the board's shell (not from inside a
// note), and that the path requests nothing identifying the visitor.

test("[AC-019] a visible shell link reaches the grievance-contact screen without opening a note, and it shows contact details", async ({
  page,
}) => {
  await page.goto("/");

  const link = page.getByRole("link", { name: /contact.*grievance/i });
  await expect(link).toBeVisible();
  await link.click();

  await expect(page).toHaveURL(/grievance-contact/);

  // An email address, a phone number and a postal address are all shown on the screen.
  await expect(page.getByText(/@/)).toBeVisible();
  await expect(page.getByText(/\+?\d[\d \-()]{6,}\d/)).toBeVisible();
  await expect(page.getByText(/bengaluru|address/i)).toBeVisible();

  // A response-window (acknowledgement / resolution time) is shown.
  await expect(page.getByText(/hrs|hours|days/i).first()).toBeVisible();
});

test("[NFR-001] the grievance-contact path requests no sign-in, email or other personal detail from the visitor", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: /contact.*grievance/i }).click();
  await expect(page).toHaveURL(/grievance-contact/);

  // No form field asks the visitor to type a password, email or account identifier.
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await expect(page.locator('input[type="email"]')).toHaveCount(0);
  await expect(page.getByLabel(/^your email$/i)).toHaveCount(0);
  await expect(page.getByLabel(/^your name$/i)).toHaveCount(0);
  await expect(page.getByRole("button", { name: /sign in|log in|register/i })).toHaveCount(0);
});
