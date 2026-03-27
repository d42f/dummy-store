import CloseIcon from '@assets/icons/close.svg?react';

import { Button, type ButtonProps } from '@/components/Button';
import { cn } from '@/lib/cn';

export function CloseButton({ size = 'sm', className, ...props }: Omit<ButtonProps, 'variant' | 'children'>) {
  return (
    <Button type="button" variant="ghost" size={size} className={cn('p-0', className)} {...props}>
      <CloseIcon className="h-6 w-6" />
    </Button>
  );
}
