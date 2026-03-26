import { type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

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
  const input = (
    <div
      className={cn(
        'flex items-center gap-2 border bg-white',
        size === 'lg' && 'rounded-lg px-4 py-3',
        size === 'md' && 'rounded-md px-4 py-3',
        error ? 'border-red-400' : 'border-gray-200',
      )}
    >
      {leftElement && <span className="flex shrink-0 items-center justify-center">{leftElement}</span>}
      <input
        {...props}
        className={cn(
          'flex-1 bg-transparent outline-none placeholder:text-gray-400',
          size === 'md' && 'text-base text-gray-900',
          size === 'lg' && 'text-base text-gray-900',
          inputClassName,
        )}
      />
      {rightElement && <span className="flex shrink-0 items-center justify-center">{rightElement}</span>}
    </div>
  );

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label ? (
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-900">
          {label}
          {input}
        </label>
      ) : (
        input
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
