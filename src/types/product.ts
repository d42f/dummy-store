export interface Product {
  id: number;
  title: string;
  category: string;
  brand: string;
  sku: string;
  rating: number;
  price: number;
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type SortField = keyof Pick<Product, 'title' | 'price' | 'rating'>;
export type SortOrder = 'asc' | 'desc';
