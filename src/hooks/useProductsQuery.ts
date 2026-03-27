import { useQuery } from '@tanstack/react-query';

import { apiUrl } from '@/lib/apiUrl';
import { type SortOrder } from '@/lib/sort';
import { type Product, type ProductsResponse } from '@/models/product';

import { useApiClient } from './useApiClient';

export type { SortOrder };
export type SortField = keyof Pick<Product, 'title' | 'price' | 'rating'>;

function getProductsUrl({
  search,
  limit,
  skip,
  sortBy,
  order,
}: {
  search: string;
  limit: number;
  skip: number;
  sortBy: SortField;
  order: SortOrder;
}) {
  if (search) {
    return apiUrl('/products/search', { q: search, limit, skip, sortBy, order });
  }
  return apiUrl('/products', { limit, skip, sortBy, order });
}

export function useProductsQuery({
  search,
  page,
  limit,
  sortBy,
  order,
}: {
  search: string;
  page: number;
  limit: number;
  sortBy: SortField;
  order: SortOrder;
}) {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ['products', search, page, limit, sortBy, order],
    queryFn: () =>
      apiClient<ProductsResponse>(getProductsUrl({ search, limit, skip: (page - 1) * limit, sortBy, order })),
    placeholderData: prev => prev,
  });
}
