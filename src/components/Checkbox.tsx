import { type InputHTMLAttributes, useId } from 'react';

import { cn } from '@/lib/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export function Checkbox({ className, label, error, id, ...props }: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={inputId} className="flex cursor-pointer items-center gap-2">
        <input
          {...props}
          id={inputId}
          type="checkbox"
          className={cn(
            'h-4 w-4 cursor-pointer rounded border-gray-300 accent-sky-600 disabled:cursor-not-allowed disabled:opacity-60',
          )}
        />
        {label && <span className="text-sm font-medium text-gray-900">{label}</span>}
      </label>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
