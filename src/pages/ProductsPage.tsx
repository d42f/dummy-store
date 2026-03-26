import { useEffect, useState } from 'react';

import PlusIcon from '@assets/icons/plus.svg?react';
import RefreshIcon from '@assets/icons/refresh.svg?react';
import SearchIcon from '@assets/icons/search.svg?react';

import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput';
import { ProductsPagination } from '@/components/Pagination';
import { ProductsTable } from '@/components/ProductsTable';
import { useProductsQuery } from '@/hooks/useProductsQuery';
import { cn } from '@/lib/cn';

const PAGE_SIZE = 20;
const LOW_RATING_THRESHOLD = 4;

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

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <span className="font-semibold">Все позиции</span>
          <div className="flex items-center gap-2">
            <Button className="px-2" variant="secondary" disabled={isFetching} onClick={() => refetch()}>
              <span className="flex h-6 w-6 items-center justify-center">
                <RefreshIcon className={cn('h-4 w-4', isFetching && 'animate-spin')} />
              </span>
            </Button>
            <Button>
              <PlusIcon className="h-4 w-4" />
              Добавить
            </Button>
          </div>
        </div>

        <ProductsTable
          products={data?.products ?? []}
          isFetching={isFetching}
          lowRatingThreshold={LOW_RATING_THRESHOLD}
        />

        {(data?.total ?? 0) > 0 && (
          <ProductsPagination page={page} limit={PAGE_SIZE} total={data?.total ?? 0} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
}
