// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { ExcelUtils } from "../../core/web/utils/excelUtils";
import { test, expect } from "@playwright/test";

const testData = ExcelUtils.readExcel(
  "./test-data/loginData.xlsx",
  "test-data",
);
const standardUserData = testData.find(
  (row) => row.username === "standard_user",
);

test.describe("Inventory", () => {
  test("Add and remove all inventory items", async ({ page }) => {
    if (
      !standardUserData ||
      typeof standardUserData.password !== "string"
    ) {
      throw new Error("Excel test data must include standard_user credentials.");
    }

    // 1. Login successfully and add every inventory item to the cart.
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill(standardUserData.password);
    await page.getByRole("button", { name: "Login" }).click();

    const addButtons = page.getByRole("button", { name: "Add to cart" });
    for (let i = 0; i < 6; i++) {
      await addButtons.first().click();
    }
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
      "6",
    );

    // 2. Remove every item.
    const removeButtons = page.getByRole("button", { name: "Remove" });
    for (let i = 0; i < 6; i++) {
      await removeButtons.first().click();
    }
    await expect(page.getByRole("button", { name: "Add to cart" })).toHaveCount(
      6,
    );
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(
      0,
    );
  });
});
