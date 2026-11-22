import { test, expect, chromium, Locator } from "@playwright/test";

test.describe("Run All", async () => {
  test("@web test", async () => {
    const browserInstance = await chromium.launch({
      headless: false,
      ignoreDefaultArgs: false,
      channel: "chrome",
      slowMo: 10,
      timeout: 5000,
    });

    const context = await browserInstance.newContext();
    const page = await context.newPage();

    await page.goto("https://saucedemo.com");
    await page.locator("//*[@name='user-name']").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click({ timeout: 2000 });
    //context.waitForEvent("page", { timeout: 20000 });

    await expect(page.locator("text='Swag Labs'")).toBeVisible({
      visible: true,
    });
    const locators: Array<Locator> = await page
      .locator("xpath=//button[contains(@id,'add-to-cart-sauce')]")
      .all();

    //  locators.at(1)

    for (let i = 1; i < locators.length; i++) {
      // page.waitForFunction()
      locators.at(i);
    }
    await page.locator("data-test=shopping-cart-link").click();
    await page.getByRole("button", { name: "Checkout" }).click();
    // const cdpSession = await context.newCDPSession(page);
    // cdpSession.send("Animation.enable");
  });

  test("API test", async ({ request }) => {
    request.get<any>("", {});
  });

  test("API test one", async ({ page }) => {
    const [newPage] = await Promise.all([
      await page.waitForEvent("load"),
      page.click("#ope"),
    ]);

    page.frameLocator("").locator("");
    expect(page.locator("")).toBeAttached({
      attached: true,
      signal: AbortSignal.abort(),
    });
  });
});
