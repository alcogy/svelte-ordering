import { expect, test } from '@playwright/test';

test('home page has expected Title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Svelte Ordering');
  await expect(page.locator('h2')).toHaveText('Product list');
});

test('link to other page', async ({page}) => {
  await page.goto('/');
  const cart = page.getByRole('link', { name: "Cart" });
  await cart.click();
  await expect(page.locator('h2')).toHaveText('Cart');

  const history = page.getByRole('link', { name: "Order History" });
  await history.click();
  await expect(page.locator('h2')).toHaveText('Order history');
})

test('Add Cart and Remove Cart', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('row', { name: 'Tape Koku € 480 - Add cart' }).getByRole('button').click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page.locator('tbody')).toContainText('1');

  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByRole('paragraph')).toContainText('No data...');  
});

test('Order', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('row', { name: 'Tape Koku € 480 - Add cart' }).getByRole('button').click();
  await page.getByRole('row', { name: '2 Pencil sharpener Stead €' }).getByRole('button').click();
  await page.getByRole('link', { name: 'Cart' }).click();
  page.once('dialog', dialog => {
    dialog.accept();
  });
  await page.getByRole('button', { name: 'Submit Order' }).click();
  await page.getByRole('link', { name: 'Order History' }).click();

});