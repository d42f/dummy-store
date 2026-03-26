import { useEffect, useState } from 'react';

import SearchIcon from '@assets/icons/search.svg?react';

import { FormInput } from '@/components/FormInput';
import { ProductsPagination } from '@/components/Pagination';
import { ProductsTable } from '@/components/ProductsTable';
import { useProductsQuery } from '@/hooks/useProductsQuery';

const PAGE_SIZE = 20;

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(id);
  }, [search]);

  const { data, isFetching, refetch } = useProductsQuery({ search: debouncedSearch, page, limit: PAGE_SIZE });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-bold">Товары</h3>
        <FormInput
          className="flex-1"
          placeholder="Найти"
          value={search}
          leftElement={<SearchIcon className="text-gray-400" />}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <ProductsTable
        className="rounded-xl border border-gray-100 bg-white shadow-sm"
        products={data?.products ?? []}
        isFetching={isFetching}
        onRefetch={refetch}
        onPageChange={setPage}
      />

      {(data?.total ?? 0) > 0 && (
        <ProductsPagination page={page} limit={PAGE_SIZE} total={data?.total ?? 0} onPageChange={setPage} />
      )}
    </div>
  );
}
