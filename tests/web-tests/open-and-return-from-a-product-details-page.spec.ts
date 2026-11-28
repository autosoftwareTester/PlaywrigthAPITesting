// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Inventory', () => {
  test('Open and return from a product details page', async ({ page }) => {
    // 1. Login successfully and open the Sauce Labs Backpack details page.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'View details for Sauce Labs Backpack' }).first().click();

    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();

    // 2. Add the product to the cart, then use Back to products.
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
  });
});
