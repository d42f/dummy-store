import CloseIcon from '@assets/icons/close.svg?react';

import { cn } from '@/shared/lib/cn';
import { Button, type ButtonProps } from '@/shared/ui/Button';

export function CloseButton({ size = 'sm', variant = 'ghost', className, ...props }: Omit<ButtonProps, 'children'>) {
  return (
    <Button type="button" variant={variant} size={size} className={cn('group p-0', className)} {...props}>
      <CloseIcon className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90" />
    </Button>
  );
}
