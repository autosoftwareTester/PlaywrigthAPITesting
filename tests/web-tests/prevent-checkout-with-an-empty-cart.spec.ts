// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout', () => {
  test('Prevent checkout with an empty cart', async ({ page }) => {
    // 1. Login successfully, open the cart, and do not add any items.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);

    // 2. Activate Checkout.
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/\/cart\.html$/);
  });
});
