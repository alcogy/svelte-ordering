import { expect, test } from '@playwright/test';

test('home page has expected Title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Tiny Ordering');
});
