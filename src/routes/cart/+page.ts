import { browser } from '$app/environment';

export function load() {
  if (browser) {
    const carts = JSON.parse(localStorage.getItem('carts') as string);
    return {
      carts: carts
    };
  }
}
