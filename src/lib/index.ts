export const symbol = "€";

// place files you want to import through the `$lib` alias in this folder.
export function formatPrice(price: number): string {
  return `${symbol} ${price.toLocaleString()} -`;
}

