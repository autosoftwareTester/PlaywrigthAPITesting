// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('Validate each login field independently', async ({ page }) => {
    // 1. Start from a fresh browser context and navigate to the login page.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2. Enter standard_user as the username and leave Password empty, then activate Login.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');

    // 3. Clear the username and enter secret_sauce as the password, then activate Login.
    await page.locator('[data-test="username"]').fill('');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });
});
