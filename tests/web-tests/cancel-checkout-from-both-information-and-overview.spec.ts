// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout', () => {
  test('Cancel checkout from both information and overview steps', async ({ page }) => {
    // 1. Login, add one item, open the cart, and enter checkout.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    // 2. Activate Cancel on the information step.
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.locator('[data-test="inventory-item"]')).toContainText('Sauce Labs Backpack');

    // 3. Select Checkout, enter valid information, and continue to the overview.
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('10001');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

    // 4. Activate Cancel on the overview step.
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
