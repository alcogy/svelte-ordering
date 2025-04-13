import { expect, test } from 'vitest';
import { formatPrice } from '$lib';

test('price 1', () => {
  const price = formatPrice(123);
  expect(price).toBe('€ 123 -');
});

test('price big numbeer', () => {
  const price = formatPrice(123456789);
  expect(price).toBe('€ 123,456,789 -');
});
