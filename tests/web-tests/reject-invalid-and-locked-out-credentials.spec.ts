// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('Reject invalid and locked-out credentials', async ({ page }) => {
    // 1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();

    // 2. Enter invalid_user and wrong_password, then activate Login.
    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');

    // 3. Enter locked_out_user and secret_sauce, then activate Login.
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');

    // 4. Submit the login form with Username and Password both empty.
    await page.locator('[data-test="username"]').fill('');
    await page.locator('[data-test="password"]').fill('');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });
});
