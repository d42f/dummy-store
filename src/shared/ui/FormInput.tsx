import { type InputHTMLAttributes, type ReactNode, useId } from 'react';

import { cn } from '@/shared/lib/cn';

export interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputClassName?: string;
  label?: string;
  error?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  size?: 'md' | 'lg';
}

export function FormInput({
  className,
  inputClassName,
  label,
  error,
  leftElement,
  rightElement,
  size = 'md',
  ...props
}: FormInputProps) {
  const id = useId();
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <label
        className={cn(
          'flex items-center gap-2 border bg-white transition-colors',
          'has-[:focus]:ring-offset--1 has-[:focus]:ring-2 has-[:focus]:ring-blue-500',
          size === 'lg' && 'rounded-lg px-4 py-3',
          size === 'md' && 'rounded-md px-3 py-2',
          error
            ? 'border-red-400 hover:border-red-500 has-[:focus]:ring-red-500'
            : 'border-gray-200 hover:border-gray-400',
        )}
      >
        {leftElement && <span className="flex shrink-0 items-center justify-center">{leftElement}</span>}
        <input
          id={id}
          {...props}
          className={cn(
            'w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-gray-400',
            size === 'md' && 'text-base text-gray-900',
            size === 'lg' && 'text-base text-gray-900',
            inputClassName,
          )}
        />
        {rightElement && <span className="flex shrink-0 items-center justify-center">{rightElement}</span>}
      </label>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
