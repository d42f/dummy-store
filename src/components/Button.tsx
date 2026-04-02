import { type ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'inline';
  size?: 'lg' | 'md' | 'sm' | 'inline';
}

export function Button({ className, variant = 'primary', size = 'md', children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'flex cursor-pointer items-center justify-center gap-1 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' && 'border border-sky-600 bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800',
        variant === 'secondary' && 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 active:bg-gray-100',
        variant === 'ghost' && 'text-gray-400 hover:text-gray-600',
        variant === 'inline' && 'text-gray-900 hover:text-gray-600',
        size === 'lg' && 'rounded-lg px-5 py-3 text-lg',
        size === 'md' && 'rounded-md px-4 py-2 text-base',
        size === 'sm' && 'rounded-sm px-3 py-1 text-sm',
        className,
      )}
    >
      {children}
    </button>
  );
}
