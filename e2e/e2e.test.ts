import { expect, test } from '@playwright/test';

test('Add Cart and Remove Cart', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('row', { name: 'Tape Koku € 480 - Add cart' })
    .getByRole('button')
    .click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page.locator('tbody')).toContainText('1');

  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByRole('paragraph')).toContainText('No data...');
});

test('Order', async ({ page }) => {
  await page.goto('/history');
  const prevRow = await page.locator('table tbody tr').count();

  await page.goto('/');
  await page
    .getByRole('row', { name: 'Tape Koku € 480 - Add cart' })
    .getByRole('button')
    .click();
  await page
    .getByRole('row', { name: '2 Pencil sharpener Stead €' })
    .getByRole('button')
    .click();
  await page.getByRole('link', { name: 'Cart' }).click();
  page.once('dialog', (dialog) => {
    dialog.accept();
  });
  await page.getByRole('button', { name: 'Submit Order' }).click();
  await page.getByRole('link', { name: 'Order History' }).click();

  await expect(await page.locator('table tbody tr').count()).toBe(prevRow + 1);
});
