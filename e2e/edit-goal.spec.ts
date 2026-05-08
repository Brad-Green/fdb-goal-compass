import { test, expect } from "@playwright/test";
import { SEEDED_NOW_ISO, SEEDED_NOW_QUARTER } from "./fixtures/time";

test.use({ locale: "en-US", timezoneId: "UTC" });

// Seeded goal used in these specs. Lives in Q1 2025 in useGoals.ts.
const SEEDED_TITLE = "Lead Team Project Retrospective";
const SEEDED_START_STATUS_LABEL = "Not Started";
const SEEDED_START_PERCENT = 0;

test.describe("Edit Goal (detail sheet)", () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install({ time: SEEDED_NOW_ISO });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /career goals/i }),
    ).toBeVisible();
  });

  test("opens the detail sheet when a goal card is clicked", async ({ page }) => {
    const currentSection = page.locator("section", {
      has: page.getByRole("heading", {
        level: 2,
        name: new RegExp(`current quarter \\(${SEEDED_NOW_QUARTER}\\)`, "i"),
      }),
    });
    await currentSection
      .getByRole("button", { name: new RegExp(SEEDED_TITLE, "i") })
      .click();

    const sheet = page.getByRole("dialog");
    await expect(sheet).toBeVisible();
    await expect(
      sheet.getByRole("heading", { name: SEEDED_TITLE }),
    ).toBeVisible();
    await expect(sheet.getByText(SEEDED_NOW_QUARTER)).toBeVisible();
  });

  test("changing status updates the card and the live region", async ({
    page,
  }) => {
    const currentSection = page.locator("section", {
      has: page.getByRole("heading", {
        level: 2,
        name: new RegExp(`current quarter \\(${SEEDED_NOW_QUARTER}\\)`, "i"),
      }),
    });
    const card = currentSection.getByRole("button", {
      name: new RegExp(SEEDED_TITLE, "i"),
    });

    // Sanity: card starts at "Not Started" / 0%
    await expect(card).toContainText(SEEDED_START_STATUS_LABEL);
    await expect(card).toContainText(`${SEEDED_START_PERCENT}%`);

    await card.click();

    const sheet = page.getByRole("dialog");
    await expect(sheet).toBeVisible();

    // Change the status from Not Started -> In Progress via the Radix Select.
    await sheet.getByRole("combobox").click();
    await page.getByRole("option", { name: "In Progress" }).click();

    // Sheet's StatusBadge updates.
    await expect(sheet.getByText("In Progress").first()).toBeVisible();

    // The announcement fires on update.
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      /goal updated/i,
    );

    // Close the sheet so the card is no longer behind an aria-hidden overlay,
    // then assert the card reflects the new status.
    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();

    await expect(card).toHaveAttribute(
      "aria-label",
      new RegExp(`^${SEEDED_TITLE} — In Progress,`),
    );
    await expect(card).toContainText("In Progress");
  });

  test("changing percent complete updates the card progress bar", async ({
    page,
  }) => {
    const currentSection = page.locator("section", {
      has: page.getByRole("heading", {
        level: 2,
        name: new RegExp(`current quarter \\(${SEEDED_NOW_QUARTER}\\)`, "i"),
      }),
    });
    const card = currentSection.getByRole("button", {
      name: new RegExp(SEEDED_TITLE, "i"),
    });
    await card.click();

    const sheet = page.getByRole("dialog");
    const slider = sheet.getByRole("slider");
    await slider.focus();

    // Slider step is 5. Three ArrowRights -> 15%.
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");

    await expect(slider).toHaveAttribute("aria-valuenow", "15");

    // Sheet's inline percent label updates.
    await expect(sheet.getByText("15%").first()).toBeVisible();

    // Close the sheet so the card is no longer behind an aria-hidden overlay,
    // then assert the card reflects the new progress.
    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();

    await expect(card).toHaveAttribute(
      "aria-label",
      new RegExp(`^${SEEDED_TITLE} —[^,]+, 15% complete$`),
    );
    await expect(card).toContainText("15%");
  });

  test("edits in the comments textarea are persisted to the model", async ({
    page,
  }) => {
    const currentSection = page.locator("section", {
      has: page.getByRole("heading", {
        level: 2,
        name: new RegExp(`current quarter \\(${SEEDED_NOW_QUARTER}\\)`, "i"),
      }),
    });
    const card = currentSection.getByRole("button", {
      name: new RegExp(SEEDED_TITLE, "i"),
    });
    await card.click();

    const sheet = page.getByRole("dialog");
    const comments = sheet.getByLabel(/comments/i);
    await comments.fill("Kickoff meeting scheduled for next week.");
    await expect(comments).toHaveValue(
      "Kickoff meeting scheduled for next week.",
    );

    // Reopen the sheet after closing, to prove the edit survived state updates.
    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();

    await card.click();
    await expect(sheet).toBeVisible();
    await expect(sheet.getByLabel(/comments/i)).toHaveValue(
      "Kickoff meeting scheduled for next week.",
    );
  });
});
