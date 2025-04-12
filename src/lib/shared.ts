export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Cart {
  id: string;
  product: Product;
  quantity: number;
}

export const cell = 'border-t border-gray-300 py-4 px-5 text-left';
