import { type ReactNode, type SubmitEventHandler } from 'react';

import { Logo } from '@/components/Logo';
import { cn } from '@/lib/cn';

interface AuthFormProps {
  className?: string;
  title: string;
  subtitle: string;
  isSubmitting: boolean;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  children: ReactNode;
}

export function AuthForm({ className, title, subtitle, isSubmitting, onSubmit, children }: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className={cn('w-full rounded-2xl bg-white p-6 shadow-sm', className)}>
      <div className="mb-2 flex justify-center">
        <Logo className="h-14 w-14" />
      </div>

      <h1 className="mb-1 text-center text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mb-3 text-center text-sm text-gray-400">{subtitle}</p>

      <fieldset disabled={isSubmitting} className="flex flex-col gap-3">
        {children}
      </fieldset>
    </form>
  );
}
