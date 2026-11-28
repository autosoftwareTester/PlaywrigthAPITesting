// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('Verify logout resets the authenticated session', async ({ page }) => {
    // 1. Login successfully with standard_user and secret_sauce.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    // 2. Open the menu and select Logout.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.locator('[data-test="username"]')).toHaveValue('');
    await expect(page.locator('[data-test="password"]')).toHaveValue('');

    // 3. Navigate directly to /inventory.html.
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
