import { test, expect } from "@playwright/test";

test("standard user can add a product to the cart", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");
});
