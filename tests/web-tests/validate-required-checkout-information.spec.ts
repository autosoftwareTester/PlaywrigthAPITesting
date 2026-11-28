// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout', () => {
  test('Validate required checkout information', async ({ page }) => {
    // 1. Login, add at least one item, open the cart, and select Checkout.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    // 2. Leave all fields empty and select Continue.
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');

    // 3. Enter only a first name and select Continue.
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');

    // 4. Enter a first name and last name but leave Postal Code empty, then select Continue.
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });
});
