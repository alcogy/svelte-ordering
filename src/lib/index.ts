// place files you want to import through the `$lib` alias in this folder.
export function formatPrice(price: number): string {
  return `€ ${price.toLocaleString()} -`;
}
