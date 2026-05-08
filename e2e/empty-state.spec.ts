import { test, expect } from "@playwright/test";
import { FAKE_NOW_ISO, FAKE_NOW_QUARTER } from "./fixtures/time";

test.use({ locale: "en-US", timezoneId: "UTC" });

// At FAKE_NOW_ISO the current quarter is Q2 2026. No seeded goals live there,
// so the current-quarter section renders its empty-state message.
test.describe("Empty current quarter", () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install({ time: FAKE_NOW_ISO });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /career goals/i }),
    ).toBeVisible();
  });

  test("shows the empty-state copy in the current-quarter section", async ({
    page,
  }) => {
    const currentSection = page.locator("section", {
      has: page.getByRole("heading", {
        level: 2,
        name: new RegExp(`current quarter \\(${FAKE_NOW_QUARTER}\\)`, "i"),
      }),
    });

    await expect(currentSection.getByRole("button")).toHaveCount(0);
    await expect(
      currentSection.getByText(
        /no goals for this quarter yet\. click 'add goal' to create one\./i,
      ),
    ).toBeVisible();
  });

  test("adding a goal replaces the empty-state with the new card", async ({
    page,
  }) => {
    const currentSection = page.locator("section", {
      has: page.getByRole("heading", {
        level: 2,
        name: new RegExp(`current quarter \\(${FAKE_NOW_QUARTER}\\)`, "i"),
      }),
    });
    const emptyMessage = currentSection.getByText(
      /no goals for this quarter yet/i,
    );
    await expect(emptyMessage).toBeVisible();

    await page.getByRole("button", { name: /add goal/i }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel(/title/i).fill("First Q2 2026 goal");
    await dialog.getByRole("button", { name: /create goal/i }).click();
    await expect(dialog).toBeHidden();

    await expect(emptyMessage).toBeHidden();
    await expect(
      currentSection.getByRole("button", { name: /first q2 2026 goal/i }),
    ).toBeVisible();
  });
});
