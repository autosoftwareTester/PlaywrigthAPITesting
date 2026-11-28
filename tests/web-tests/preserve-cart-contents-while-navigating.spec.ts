// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  test('Preserve cart contents while navigating', async ({ page }) => {
    // 1. Login successfully and add the Backpack and Bike Light.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // 2. Open the cart, then activate Continue Shopping.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await expect(page).toHaveURL(/\/inventory\.html$/);

    // 3. Open the cart again.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
    await expect(page.locator('[data-test="inventory-item"]')).toContainText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
  });
});
