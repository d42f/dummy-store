import { type ReactNode } from 'react';
import { Content, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';

import { cn } from '@/shared/lib/cn';
import { CloseButton } from '@/shared/ui/CloseButton';

interface ModalProps {
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}

export function Modal({ className, open, onOpenChange, title, children }: ModalProps) {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Content
          className={cn(
            'fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-xl outline-none',
            className,
          )}
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <Title className="text-lg font-semibold text-gray-900">{title}</Title>
            <CloseButton onClick={() => onOpenChange(false)} />
          </div>
          <div className="px-6 py-4">{children}</div>
        </Content>
      </Portal>
    </Root>
  );
}
