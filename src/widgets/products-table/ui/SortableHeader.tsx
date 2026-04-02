import SortAscIcon from '@assets/icons/sort-asc.svg?react';

import { type SortField, type SortOrder } from '@/entities/product';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';

interface SortableHeaderProps {
  className?: string;
  field: SortField;
  sortBy: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  children: React.ReactNode;
}

export function SortableHeader({ className, field, sortBy, sortOrder, onSort, children }: SortableHeaderProps) {
  const active = sortBy === field;
  return (
    <Button
      className={cn('inline-flex text-inherit hover:text-gray-600', active && 'text-gray-900', className)}
      size="inline"
      variant="inline"
      onClick={() => onSort(field)}
    >
      {children}
      <span className="ml-1 inline-flex flex-col gap-px leading-none">
        <SortAscIcon className={cn(active && sortOrder === 'asc' ? 'text-gray-600' : 'text-gray-300')} />
        <SortAscIcon className={cn('rotate-180', active && sortOrder === 'desc' ? 'text-gray-600' : 'text-gray-300')} />
      </span>
    </Button>
  );
}
