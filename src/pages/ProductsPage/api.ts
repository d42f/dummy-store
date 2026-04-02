import { useQuery } from '@tanstack/react-query';

import { useApiClient } from '@/context/useApiClient';
import { apiUrl } from '@/lib/apiUrl';
import { type ProductsResponse, type SortField, type SortOrder } from '@/types/product';

export type { SortField, SortOrder };

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
