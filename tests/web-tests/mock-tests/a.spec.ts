import { test, expect } from "@playwright/test";

test("test one", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  page.waitForEvent('load');
  await page.getByLabel("Username").fill("standard_user");
  await page.getByLabel("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page
    .locator("xpath=(//div[@class='inventory_list'])")
    .filter({
      hasText: "Sauce Labs Bike Light",
    })
    .getByRole("button", { name: "Add to cart" })
    .nth(0)
    .click();

});
