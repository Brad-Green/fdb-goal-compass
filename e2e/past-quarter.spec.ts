import { test, expect } from "@playwright/test";
import { FAKE_NOW_ISO, FAKE_NOW_QUARTER } from "./fixtures/time";

test.use({ locale: "en-US", timezoneId: "UTC" });

// At FAKE_NOW_ISO the current quarter is Q2 2026. All 6 seeded goals live in
// Q1 2025 (ids 1-3) or Q4 2024 (ids 4-6) — so they all render in past-quarter
// sections, grouped by quarter, newest-first.
test.describe("Past-quarter sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install({ time: FAKE_NOW_ISO });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /career goals/i }),
    ).toBeVisible();
  });

  test("renders Q1 2025 and Q4 2024 sections in descending order", async ({
    page,
  }) => {
    const pastHeadings = page.locator("main h2").filter({
      hasNotText: /current quarter/i,
    });
    await expect(pastHeadings).toHaveCount(2);
    await expect(pastHeadings.nth(0)).toHaveText("Q1 2025");
    await expect(pastHeadings.nth(1)).toHaveText("Q4 2024");
  });

  test("each past-quarter section groups its seeded goals", async ({
    page,
  }) => {
    const q1 = page.locator("section", {
      has: page.getByRole("heading", { level: 2, name: "Q1 2025" }),
    });
    const q4 = page.locator("section", {
      has: page.getByRole("heading", { level: 2, name: "Q4 2024" }),
    });

    await expect(q1.getByRole("button")).toHaveCount(3);
    await expect(
      q1.getByRole("button", { name: /complete react certification/i }),
    ).toBeVisible();
    await expect(
      q1.getByRole("button", { name: /lead team project retrospective/i }),
    ).toBeVisible();
    await expect(
      q1.getByRole("button", { name: /improve code review turnaround/i }),
    ).toBeVisible();

    await expect(q4.getByRole("button")).toHaveCount(3);
    await expect(
      q4.getByRole("button", { name: /complete accessibility audit/i }),
    ).toBeVisible();
    await expect(
      q4.getByRole("button", { name: /mentor junior developer/i }),
    ).toBeVisible();
    await expect(
      q4.getByRole("button", { name: /migrate legacy api endpoints/i }),
    ).toBeVisible();
  });

  test("a past-quarter card opens the detail sheet with past-quarter metadata", async ({
    page,
  }) => {
    const q4 = page.locator("section", {
      has: page.getByRole("heading", { level: 2, name: "Q4 2024" }),
    });
    await q4
      .getByRole("button", { name: /complete accessibility audit/i })
      .click();

    const sheet = page.getByRole("dialog");
    await expect(sheet).toBeVisible();
    await expect(
      sheet.getByRole("heading", { name: /complete accessibility audit/i }),
    ).toBeVisible();
    await expect(sheet.getByText("Q4 2024")).toBeVisible();
    // This seeded goal is at 100% / Complete.
    await expect(sheet.getByRole("slider")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });

  test("does not mix past goals into the current-quarter section", async ({
    page,
  }) => {
    const currentSection = page.locator("section", {
      has: page.getByRole("heading", {
        level: 2,
        name: new RegExp(`current quarter \\(${FAKE_NOW_QUARTER}\\)`, "i"),
      }),
    });
    await expect(currentSection.getByRole("button")).toHaveCount(0);
  });
});
