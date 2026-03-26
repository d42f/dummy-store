import { cn } from '@/lib/cn';
import { type Product } from '@/models/product';

import { ProductRow, type ProductRowProps } from './ProductRow';

interface ProductsTableProps extends Pick<ProductRowProps, 'lowRatingThreshold'> {
  className?: string;
  products: Product[];
  isFetching: boolean;
}

export function ProductsTable({ className, products, isFetching, lowRatingThreshold }: ProductsTableProps) {
  return (
    <table className={cn('w-full table-fixed text-sm', className)}>
      <colgroup>
        <col className="w-16" />
        <col className="w-80" />
        <col className="w-36" />
        <col className="w-36" />
        <col className="w-24" />
        <col className="w-36" />
        <col className="w-24" />
      </colgroup>
      <thead>
        <tr className="border-t border-b border-gray-100 text-gray-400">
          <th className="px-6 py-3">
            <input type="checkbox" className="cursor-pointer accent-sky-600" />
          </th>
          <th className="px-3 py-3 text-left font-medium">Наименование</th>
          <th className="px-3 py-3 text-left font-medium">Вендор</th>
          <th className="px-3 py-3 text-left font-medium">Артикул</th>
          <th className="px-3 py-3 text-center font-medium">Оценка</th>
          <th className="px-3 py-3 text-right font-medium">Цена, ₽</th>
          <th className="px-6 py-3" />
        </tr>
      </thead>
      <tbody className={cn('transition-opacity', isFetching && 'opacity-50')}>
        {products.map(product => (
          <ProductRow key={product.id} product={product} lowRatingThreshold={lowRatingThreshold} />
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
  );
}
