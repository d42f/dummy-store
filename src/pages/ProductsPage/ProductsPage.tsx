import { useEffect, useReducer } from 'react';

import CloseIcon from '@assets/icons/close.svg?react';
import PlusIcon from '@assets/icons/plus.svg?react';
import RefreshIcon from '@assets/icons/refresh.svg?react';
import SearchIcon from '@assets/icons/search.svg?react';

import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput';
import { ProductsPagination } from '@/components/Pagination';
import { cn } from '@/lib/cn';

import { useProductsQuery } from './api';
import { ProductsTable } from './components/ProductsTable';
import { initialState, reducer } from './model';

const PAGE_SIZE = 20;
const LOW_RATING_THRESHOLD = 4;

export function ProductsPage() {
  const [{ search, debouncedSearch, page, sortBy, sortOrder }, dispatch] = useReducer(reducer, initialState);

  const { data, isFetching, refetch } = useProductsQuery({
    search: debouncedSearch,
    page,
    limit: PAGE_SIZE,
    sortBy,
    order: sortOrder,
  });

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'COMMIT_SEARCH' }), 400);
    return () => clearTimeout(id);
  }, [search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-bold">Товары</h3>
        <FormInput
          className="flex-1"
          placeholder="Найти"
          value={search}
          leftElement={<SearchIcon className="text-gray-400" />}
          rightElement={
            search && (
              <Button
                className="p-0"
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => dispatch({ type: 'SET_SEARCH', search: '' })}
              >
                <CloseIcon />
              </Button>
            )
          }
          onChange={e => dispatch({ type: 'SET_SEARCH', search: e.target.value })}
        />
      </div>

      <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {isFetching && (
          <div className="absolute top-0 left-0 h-1 w-full">
            <div className="h-full animate-[progress_30s_linear_forwards] bg-blue-500" />
          </div>
        )}
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
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={field => dispatch({ type: 'SORT', field })}
        />

        {(data?.total ?? 0) > 0 && (
          <ProductsPagination
            page={page}
            limit={PAGE_SIZE}
            total={data?.total ?? 0}
            onPageChange={p => dispatch({ type: 'SET_PAGE', page: p })}
          />
        )}
      </div>
    </div>
  );
}
