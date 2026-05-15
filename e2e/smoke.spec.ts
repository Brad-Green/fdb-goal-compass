import { test, expect } from "@playwright/test";
import { expectNoAxeViolations } from "./fixtures/axe";
import { SEEDED_NOW_ISO } from "./fixtures/time";

test.use({ locale: "en-US", timezoneId: "UTC" });

test.describe("smoke", () => {
  test("app renders at / with the Career Goals heading and no console errors", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: /career goals/i }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /add goal/i })).toBeVisible();
    expect(new URL(page.url()).pathname).toBe("/");
    expect(consoleErrors).toEqual([]);
  });

  test("app state survives a full page reload", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /career goals/i }),
    ).toBeVisible();

    await page.reload();

    await expect(
      page.getByRole("heading", { level: 1, name: /career goals/i }),
    ).toBeVisible();
    expect(new URL(page.url()).pathname).toBe("/");
  });

  test("populated home view has no axe violations", async ({ page }) => {
    // Freeze to a quarter where seeded goals exist so we scan the populated
    // layout (header + current-quarter + past-quarter sections) in one pass.
    await page.clock.install({ time: SEEDED_NOW_ISO });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /career goals/i }),
    ).toBeVisible();
    await expectNoAxeViolations(page);
  });
});
