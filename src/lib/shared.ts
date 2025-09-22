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
