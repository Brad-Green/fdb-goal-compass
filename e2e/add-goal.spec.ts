import { test, expect } from "@playwright/test";
import { FAKE_NOW_ISO, FAKE_NOW_QUARTER } from "./fixtures/time";

test.use({ locale: "en-US", timezoneId: "UTC" });

test.describe("Add Goal (primary flow)", () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install({ time: FAKE_NOW_ISO });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /career goals/i }),
    ).toBeVisible();
  });

  test("opens the dialog when the Add Goal button is clicked", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /add goal/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: /add new goal/i }),
    ).toBeVisible();
    await expect(
      dialog.getByText(new RegExp(`create a new goal for ${FAKE_NOW_QUARTER}`, "i")),
    ).toBeVisible();
  });

  test("submits a new goal and shows it in the current-quarter section", async ({
    page,
  }) => {
    const uniqueTitle = `Launch Beta ${Date.now()}`;

    await page.getByRole("button", { name: /add goal/i }).click();
    const dialog = page.getByRole("dialog");

    await dialog.getByLabel(/title/i).fill(uniqueTitle);
    await dialog
      .getByLabel(/description/i)
      .fill("Ship the beta to internal users.");
    await dialog.getByRole("button", { name: /create goal/i }).click();

    await expect(dialog).toBeHidden();

    const currentSection = page.locator("section", {
      has: page.getByRole("heading", {
        level: 2,
        name: new RegExp(`current quarter \\(${FAKE_NOW_QUARTER}\\)`, "i"),
      }),
    });
    const newCard = currentSection
      .getByRole("button", { name: new RegExp(uniqueTitle, "i") })
      .first();
    await expect(newCard).toBeVisible();
    await expect(newCard).toContainText(/not started/i);
    await expect(newCard).toContainText("0%");
  });

  test("disables Create Goal until a non-blank title is entered", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /add goal/i }).click();
    const dialog = page.getByRole("dialog");
    const submit = dialog.getByRole("button", { name: /create goal/i });

    await expect(submit).toBeDisabled();

    await dialog.getByLabel(/title/i).fill("   ");
    await expect(submit).toBeDisabled();

    await dialog.getByLabel(/title/i).fill("Real title");
    await expect(submit).toBeEnabled();
  });

  test("Cancel discards the draft and does not add a goal", async ({ page }) => {
    const currentSection = page.locator("section", {
      has: page.getByRole("heading", {
        level: 2,
        name: new RegExp(`current quarter \\(${FAKE_NOW_QUARTER}\\)`, "i"),
      }),
    });
    const before = await currentSection.getByRole("button").count();

    await page.getByRole("button", { name: /add goal/i }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel(/title/i).fill("Discarded draft");
    await dialog.getByRole("button", { name: /cancel/i }).click();

    await expect(dialog).toBeHidden();
    await expect(
      currentSection.getByRole("button", { name: /discarded draft/i }),
    ).toHaveCount(0);
    await expect(currentSection.getByRole("button")).toHaveCount(before);
  });

  test("the screen-reader live region announces the new goal", async ({
    page,
  }) => {
    const liveRegion = page.locator('[aria-live="polite"]');
    await expect(liveRegion).toHaveText("");

    await page.getByRole("button", { name: /add goal/i }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel(/title/i).fill("Announced goal");
    await dialog.getByRole("button", { name: /create goal/i }).click();
    await expect(dialog).toBeHidden();

    await expect(liveRegion).toHaveText(/goal "announced goal" created/i);
  });
});
