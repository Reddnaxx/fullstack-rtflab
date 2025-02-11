'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { cn } from '@/shared/lib/helpers/cn';
import { useOnOutsideClick } from '@/shared/lib/hooks/useOnOutsideClick';

import { Card } from '../Card';

import type { FC, ReactNode } from 'react';

interface ModalProps {
  children?: ReactNode;
  className?: string;
}

export const Modal: FC<ModalProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { back } = useRouter();

  useOnOutsideClick(() => {
    back();
  }, ref);

  return (
    <div className="absolute inset-0 flex animate-appear items-center justify-center bg-black/20">
      <Card ref={ref} className={cn('min-w-96', className)}>
        {children}
      </Card>
    </div>
  );
};
