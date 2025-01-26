'use client';
import { useAppSelector } from '@/shared/lib/hooks/store';

import { AuthLoaderUI } from './AuthLoaderUI';
import { selectIsAuthUpdating } from '../../store/slice';

import type { FC, ReactNode } from 'react';

interface AuthLoaderWrapperProps {
  children?: ReactNode;
}

export const AuthLoaderWrapper: FC<AuthLoaderWrapperProps> = ({ children }) => {
  const isUpdating = useAppSelector(selectIsAuthUpdating);

  if (!isUpdating) {
    return children;
  }

  return <AuthLoaderUI isActive={isUpdating} />;
};

export default AuthLoaderWrapper;
