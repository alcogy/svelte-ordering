export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Cart {
  id: string;
  product: Product;
}

export const cell = 'border-b border-gray-300 py-2 px-3 text-left';
