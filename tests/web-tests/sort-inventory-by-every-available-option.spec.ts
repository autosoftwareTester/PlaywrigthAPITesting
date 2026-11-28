// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Inventory', () => {
  test('Sort inventory by every available option', async ({ page }) => {
    // 1. Login successfully with standard_user and secret_sauce.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    const names = page.locator('[data-test="inventory-item-name"]');
    const sort = page.locator('[data-test="product-sort-container"]');
    await expect(sort).toHaveValue('az');
    await expect(names).toHaveCount(6);

    // 2. Select Name (Z to A).
    await sort.selectOption('za');
    await expect(names.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');

    // 3. Select Price (low to high).
    await sort.selectOption('lohi');
    await expect(names.first()).toHaveText('Sauce Labs Onesie');
    await expect(names.last()).toHaveText('Sauce Labs Fleece Jacket');

    // 4. Select Price (high to low).
    await sort.selectOption('hilo');
    await expect(names.first()).toHaveText('Sauce Labs Fleece Jacket');
    await expect(names.last()).toHaveText('Sauce Labs Onesie');

    // 5. Return to Name (A to Z).
    await sort.selectOption('az');
    await expect(names.first()).toHaveText('Sauce Labs Backpack');
  });
});
