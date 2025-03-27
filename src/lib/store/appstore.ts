import { writable } from 'svelte/store';
import { type Cart } from '$lib/shared.js';

function storeCarts() {
  const carts = writable<Cart[]>([]);

  if (typeof window !== 'undefined') {
    JSON.parse(localStorage.getItem('carts') as string);
    const data = JSON.parse(localStorage.getItem('carts') as string) || [];
    carts.set(data);
    carts.subscribe((value) => {
      localStorage.setItem('carts', JSON.stringify(value));
    });
  }

  return carts;
}
export const carts = storeCarts();
