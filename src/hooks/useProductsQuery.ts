import { useQuery } from '@tanstack/react-query';

import { apiUrl } from '@/lib/apiUrl';
import { type ProductsResponse } from '@/models/product';

import { useApiClient } from './useApiClient';

function getProductsUrl({ search, limit, skip }: { search: string; limit: number; skip: number }) {
  if (search) {
    return apiUrl('/products/search', { q: search, limit, skip });
  }
  return apiUrl('/products', { limit, skip });
}

export function useProductsQuery({ search, page, limit }: { search: string; page: number; limit: number }) {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ['products', search, page, limit],
    queryFn: () => apiClient<ProductsResponse>(getProductsUrl({ search, limit, skip: (page - 1) * limit })),
    placeholderData: prev => prev,
  });
}
