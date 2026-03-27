import { useEffect, useReducer, useState } from 'react';
import { useSearchParams } from 'react-router';

import PlusIcon from '@assets/icons/plus.svg?react';
import RefreshIcon from '@assets/icons/refresh.svg?react';
import SearchIcon from '@assets/icons/search.svg?react';

import { Button } from '@/components/Button';
import { CloseButton } from '@/components/CloseButton';
import { FormInput } from '@/components/FormInput';
import { ProductsPagination } from '@/components/Pagination';
import { cn } from '@/lib/cn';

import { type SortField, type SortOrder, useProductsQuery } from './api';
import { AddProductModal } from './components/AddProductModal';
import { ProductsTable } from './components/ProductsTable';
import { initialState, reducer } from './model';

const PAGE_SIZE = 20;
const LOW_RATING_THRESHOLD = 3.5;

const SORT_FIELDS: SortField[] = ['title', 'price', 'rating'];
const SORT_ORDERS: SortOrder[] = ['asc', 'desc'];

function parseSortField(value: string | null): SortField {
  return SORT_FIELDS.includes(value as SortField) ? (value as SortField) : initialState.sortBy;
}

function parseSortOrder(value: string | null): SortOrder {
  return SORT_ORDERS.includes(value as SortOrder) ? (value as SortOrder) : initialState.sortOrder;
}

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') ?? '';
  const [{ search, debouncedSearch, page, sortBy, sortOrder }, dispatch] = useReducer(reducer, {
    ...initialState,
    search: initialSearch,
    debouncedSearch: initialSearch,
    page: Math.max(1, Number(searchParams.get('page')) || 1),
    sortBy: parseSortField(searchParams.get('sortBy')),
    sortOrder: parseSortOrder(searchParams.get('sortOrder')),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    setSearchParams(
      (params: URLSearchParams) => {
        params.set('sortBy', sortBy);
        params.set('sortOrder', sortOrder);
        if (page > 1) {
          params.set('page', String(page));
        } else {
          params.delete('page');
        }
        if (debouncedSearch) {
          params.set('search', debouncedSearch);
        } else {
          params.delete('search');
        }
        return params;
      },
      { replace: true },
    );
  }, [sortBy, sortOrder, page, debouncedSearch, setSearchParams]);

  return (
    <>
      <AddProductModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-bold">Товары</h3>
          <FormInput
            className="flex-1"
            placeholder="Найти"
            value={search}
            leftElement={<SearchIcon className="text-gray-400" />}
            rightElement={search && <CloseButton onClick={() => dispatch({ type: 'SET_SEARCH', search: '' })} />}
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
              <Button onClick={() => setIsModalOpen(true)}>
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
    </>
  );
}
