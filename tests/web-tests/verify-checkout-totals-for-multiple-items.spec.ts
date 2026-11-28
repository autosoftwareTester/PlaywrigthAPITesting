// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout', () => {
  test('Verify checkout totals for multiple items', async ({ page }) => {
    // 1. Login and add the $7.99 Onesie and $49.99 Fleece Jacket.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // 2. Open the cart and complete checkout with valid information.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('10001');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
    await expect(page.getByText(/^Item total:/)).toHaveText('Item total: $57.98');
    await expect(page.getByText(/^Tax:/)).toBeVisible();
    await expect(page.getByText(/^Total:/)).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });
});
