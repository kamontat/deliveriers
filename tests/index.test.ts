import { expect, test } from "@playwright/test";

test("index page correct title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Deliveriers");
});
