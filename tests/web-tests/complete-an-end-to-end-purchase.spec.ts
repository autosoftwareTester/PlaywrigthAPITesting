// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout', () => {
  test('Complete an end-to-end purchase', async ({ page }) => {
    // 1. Login successfully and add the Sauce Labs Backpack to the cart.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // 2. Open the cart and select Checkout.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();

    // 3. Enter valid values in all three fields and select Continue.
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('10001');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    await expect(page.locator('[data-test="inventory-item"]')).toContainText('Sauce Labs Backpack');
    await expect(page.getByText(/^Item total:/)).toHaveText('Item total: $29.99');

    // 4. Select Finish.
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

    // 5. Select Back Home.
    await page.getByRole('button', { name: 'Back Home' }).click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });
});
