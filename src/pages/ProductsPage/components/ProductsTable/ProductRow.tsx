import MoreVerticalIcon from '@assets/icons/more-vertical.svg?react';
import PlusIcon from '@assets/icons/plus.svg?react';

import { Button } from '@/components/Button';
import { type Product } from '@/entities/Product/model';
import { cn } from '@/lib/cn';

export interface ProductRowProps {
  className?: string;
  product: Product;
  lowRatingThreshold?: number;
}

function formatPrice(price: number) {
  const [int, dec] = price.toFixed(2).split('.');
  const intFormatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return { int: intFormatted, dec };
}

export function ProductRow({ className, product, lowRatingThreshold = 0 }: ProductRowProps) {
  const { int, dec } = formatPrice(product.price);
  const lowRating = product.rating < lowRatingThreshold;

  return (
    <tr className={cn('group border-b border-gray-100 last:border-0 hover:bg-gray-50', className)}>
      <td className="px-6 py-3 text-center">
        <input type="checkbox" className="cursor-pointer accent-sky-600" />
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-md object-cover"
            src={product.thumbnail}
            alt={product.title}
            onError={e => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="overflow-hidden">
            <div className="truncate font-semibold">{product.title}</div>
            <div className="text-xs text-gray-400 capitalize">{product.category}</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 font-semibold">{product.brand ?? '—'}</td>
      <td className="px-3 py-3 text-gray-500">{product.sku}</td>
      <td className="px-3 py-3 text-center">
        <span className={cn(lowRating && 'text-red-500')}>{product.rating.toFixed(1)}</span>
        <span className="text-gray-400">/5</span>
      </td>
      <td className="px-3 py-3 text-right text-gray-800">
        {int}
        <span className="text-gray-400">,{dec}</span>
      </td>
      <td className="px-6 py-3">
        <div className="flex items-center justify-end gap-2">
          <Button variant="primary" className="h-8 w-8 rounded-full p-0">
            <PlusIcon width={14} height={14} />
          </Button>
          <Button variant="secondary" className="h-8 w-8 rounded-full p-0">
            <MoreVerticalIcon className="h-3 w-3" width={14} height={14} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
