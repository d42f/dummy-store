import ChevronLeftIcon from '@assets/icons/chevron-left.svg?react';
import ChevronRightIcon from '@assets/icons/chevron-right.svg?react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';

export interface ProductsPaginationProps {
  className?: string;
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function ProductsPagination({ className, page, limit, total, onPageChange }: ProductsPaginationProps) {
  const totalPages = Math.ceil(total / limit);
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const pageNumbers = getPaginationRange(page, totalPages);

  return (
    <div className={cn('flex items-center justify-between px-6 py-4 text-sm', className)}>
      <span>
        <span className="text-gray-500">Showing</span>{' '}
        <span className="font-medium">
          {from}-{to}
        </span>{' '}
        <span className="text-gray-500">of</span> <span className="font-medium text-gray-800">{total}</span>
      </span>

      <div className="flex items-center gap-1">
        <Button
          className="px-1"
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        {pageNumbers.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="px-1 text-gray-400">
              …
            </span>
          ) : (
            <Button key={p} variant={p === page ? 'primary' : 'secondary'} size="sm" onClick={() => onPageChange(p)}>
              {p}
            </Button>
          ),
        )}

        <Button
          className="px-1"
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function getPaginationRange(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}
