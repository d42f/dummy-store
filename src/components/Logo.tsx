import LogoIcon from '@assets/icons/logo.svg?react';

import { cn } from '@/lib/cn';

export interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm',
        className,
      )}
    >
      <LogoIcon />
    </div>
  );
}
