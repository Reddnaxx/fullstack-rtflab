'use client';

import { useRouter } from 'next/navigation';

import type { FC, ReactNode } from 'react';

interface AuthModalProps {
  children: ReactNode;
}

export const AuthModal: FC<AuthModalProps> = ({ children }) => {
  const { back } = useRouter();

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/10"
      onClick={() => back()}
    >
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default AuthModal;
