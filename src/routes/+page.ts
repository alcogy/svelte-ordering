import { browser } from '$app/environment';

export function load({ data }) {
  if (browser) {
    const carts = JSON.parse(localStorage.getItem('carts') as string);
    return {
      ...data,
      carts: carts
    };
  }
}
