import { useQuery } from '@tanstack/react-query';

import { type Product, type ProductsResponse } from '@/entities/product/model';
import { useApiClient } from '@/hooks/useApiClient';
import { apiUrl } from '@/lib/apiUrl';

export type SortOrder = 'asc' | 'desc';
export type SortField = keyof Pick<Product, 'title' | 'price' | 'rating'>;

export type ProductsQueryParams = {
  search: string;
  page: number;
  limit: number;
  sortBy: SortField;
  order: SortOrder;
};

function getProductsUrl({ search, ...rest }: Omit<ProductsQueryParams, 'page'> & { skip: number }) {
  if (search) {
    return apiUrl('/products/search', { q: search, ...rest });
  }
  return apiUrl('/products', rest);
}

export function useProductsQuery({ search, page, limit, sortBy, order }: ProductsQueryParams) {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ['products', search, page, limit, sortBy, order],
    queryFn: () =>
      apiClient<ProductsResponse>(getProductsUrl({ search, limit, skip: (page - 1) * limit, sortBy, order })),
    placeholderData: prev => prev,
  });
}
