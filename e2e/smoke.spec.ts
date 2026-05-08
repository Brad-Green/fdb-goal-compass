import { test, expect } from "@playwright/test";

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
});
