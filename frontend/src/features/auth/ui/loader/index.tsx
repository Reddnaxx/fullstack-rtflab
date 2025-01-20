'use client';
import { useAppSelector } from '@/shared/lib/hooks/store';
import { Logo, Text } from '@/shared/ui';

import { selectIsAuthUpdating } from '../../store/slice';

import type { FC, ReactNode } from 'react';

interface AuthLoaderWrapperProps {
  children?: ReactNode;
}

export const AuthLoaderWrapper: FC<AuthLoaderWrapperProps> = ({ children }) => {
  const isLoading = useAppSelector(selectIsAuthUpdating);

  if (!isLoading) {
    return children;
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-white">
      <Logo />
      <Text as="h2" weight="normal" size="24">
        Выполняется вход...
      </Text>
    </div>
  );
};

export default AuthLoaderWrapper;
