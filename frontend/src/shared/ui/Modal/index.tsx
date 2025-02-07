'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { useOnOutsideClick } from '@/shared/lib/hooks/useOnOutsideClick';

import { Card } from '../Card';

import type { FC, ReactNode } from 'react';

interface ModalProps {
  children?: ReactNode;
}

export const Modal: FC<ModalProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { back } = useRouter();

  useOnOutsideClick(() => {
    back();
  }, ref);

  return (
    <div className="absolute inset-0 flex animate-appear items-center justify-center bg-black/20">
      <Card ref={ref} className="min-w-96 max-w-2xl">
        {children}
      </Card>
    </div>
  );
};
