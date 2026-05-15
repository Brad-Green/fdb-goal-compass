import { test, expect } from "@playwright/test";
import {
  FAKE_NOW_ISO,
  SEEDED_NOW_ISO,
} from "./fixtures/time";

// Visual regression baselines. These assertions compare against committed
// PNGs under e2e/visual.spec.ts-snapshots/. To update them after an
// intentional visual change:
//
//   pnpm exec playwright test visual.spec.ts --update-snapshots
//   git add e2e/visual.spec.ts-snapshots
//
// Determinism notes:
//  - page.clock.install({ time: ... }) runs BEFORE goto so "Updated" /
//    "Created" timestamps and the current-quarter heading are pinned.
//  - locale + timezone are forced at the spec scope for stable date
//    formatting.
//  - Animations are disabled by Playwright's default toHaveScreenshot
//    config; no extra CSS toggle needed.
//  - maxDiffPixelRatio 0.01 is set globally in playwright.config.ts.
test.use({ locale: "en-US", timezoneId: "UTC" });

test.describe("visual baselines", () => {
  test("populated home at desktop (Q1 2025)", async ({ page }) => {
    await page.clock.install({ time: SEEDED_NOW_ISO });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /career goals/i }),
    ).toBeVisible();
    // Wait for the three seeded Q1 2025 cards before capturing.
    await expect(
      page.getByRole("button", { name: /complete react certification/i }),
    ).toBeVisible();
    await expect(page).toHaveScreenshot("home-populated-desktop.png", {
      fullPage: true,
    });
  });

  test("empty home at desktop (Q2 2026)", async ({ page }) => {
    await page.clock.install({ time: FAKE_NOW_ISO });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /career goals/i }),
    ).toBeVisible();
    await expect(
      page.getByText(/no goals for this quarter yet/i),
    ).toBeVisible();
    await expect(page).toHaveScreenshot("home-empty-desktop.png", {
      fullPage: true,
    });
  });

  test("populated home at mobile (Q1 2025)", async ({ page }) => {
    await page.clock.install({ time: SEEDED_NOW_ISO });
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /career goals/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /complete react certification/i }),
    ).toBeVisible();
    await expect(page).toHaveScreenshot("home-populated-mobile.png", {
      fullPage: true,
    });
  });

  test("Add Goal dialog open", async ({ page }) => {
    await page.clock.install({ time: FAKE_NOW_ISO });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.getByRole("button", { name: /add goal/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: /add new goal/i }),
    ).toBeVisible();

    // Scope the screenshot to the dialog so the darkened backdrop is
    // excluded — backdrops render with sub-pixel alpha variance between
    // runs and flake baselines.
    await expect(dialog).toHaveScreenshot("dialog-add-goal.png");
  });

  test("Goal detail sheet open", async ({ page }) => {
    await page.clock.install({ time: SEEDED_NOW_ISO });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page
      .getByRole("button", { name: /complete react certification/i })
      .click();

    const sheet = page.getByRole("dialog");
    await expect(sheet).toBeVisible();
    await expect(
      sheet.getByRole("heading", { name: /complete react certification/i }),
    ).toBeVisible();
    await expect(sheet).toHaveScreenshot("sheet-goal-detail.png");
  });
});
