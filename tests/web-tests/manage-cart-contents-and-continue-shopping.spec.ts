// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  test('Manage cart contents and continue shopping', async ({ page }) => {
    // 1. Login successfully and add the Sauce Labs Backpack.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // 2. Open the cart.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await expect(page.locator('[data-test="inventory-item"]')).toContainText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

    // 3. Remove the backpack from the cart.
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);

    // 4. Select Continue Shopping and add a second item.
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
