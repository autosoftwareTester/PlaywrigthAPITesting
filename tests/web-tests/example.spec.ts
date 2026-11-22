import { test, expect } from "../fixtures/test-fixtures";

test.describe("Run All Test ", () => {
  const url = "https://playwright.dev/";

  test("has title", async ({ loginPage }) => {
    await loginPage.navigateToLoginPage(url);
    const title = await loginPage.pageTitle();

    expect.soft("sam").not.toBeNull();
    expect(title).toBe(
      "Fast and reliable end-to-end testing for modern web apps | Playwright",
    );
  });

  test("get started link", { tag: ["@smoke", "@sanity"] }, async ({ page }) => {
    await page.goto(url);

    // Click the get started link.
    await page.getByRole("link", { name: "Get started" }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(
      page.getByRole("heading", { name: "Installation" }),
    ).toBeVisible();
  });
});
