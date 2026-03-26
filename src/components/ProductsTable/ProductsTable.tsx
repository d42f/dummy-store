import PlusIcon from '@assets/icons/plus.svg?react';
import RefreshIcon from '@assets/icons/refresh.svg?react';

import { Button } from '@/components/Button';
import { cn } from '@/lib/cn';
import { type Product } from '@/models/product';

import { ProductRow } from './ProductRow';

interface ProductsTableProps {
  className?: string;
  products: Product[];
  isFetching: boolean;
  onRefetch: () => void;
  onPageChange: (page: number) => void;
}

export function ProductsTable({ className, products, isFetching, onRefetch }: ProductsTableProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between px-6 py-4">
        <span className="font-semibold">Все позиции</span>
        <div className="flex items-center gap-2">
          <Button className="px-2" variant="secondary" disabled={isFetching} onClick={onRefetch}>
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

      <table className="w-full text-sm">
        <thead>
          <tr className="border-t border-b border-gray-100 text-gray-400">
            <th className="w-10 px-6 py-3">
              <input type="checkbox" className="cursor-pointer accent-sky-600" />
            </th>
            <th className="px-3 py-3 text-left font-medium">Наименование</th>
            <th className="px-3 py-3 text-left font-medium">Вендор</th>
            <th className="px-3 py-3 text-left font-medium">Артикул</th>
            <th className="px-3 py-3 text-center font-medium">Оценка</th>
            <th className="px-3 py-3 text-right font-medium">Цена, ₽</th>
            <th className="w-24 px-6 py-3" />
          </tr>
        </thead>
        <tbody className={cn('transition-opacity', isFetching && 'opacity-50')}>
          {products.map(product => (
            <ProductRow key={product.id} product={product} />
          ))}
          {products.length === 0 && !isFetching && (
            <tr>
              <td colSpan={7} className="py-16 text-center text-gray-400">
                Ничего не найдено
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
