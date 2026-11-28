// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('Login with a valid standard user', async ({ page }) => {
    // 1. Start from a fresh browser context and navigate to https://www.saucedemo.com/. Verify title, username, password, Login.
    await page.goto('https://www.saucedemo.com/');

    await expect(page).toHaveTitle('Swag Labs');
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2. Enter standard_user and secret_sauce and activate Login. Verify /inventory.html, Products, six inventory items.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });
});
