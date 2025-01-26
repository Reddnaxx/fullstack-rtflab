'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Text } from '@/shared/ui';

import {
  selectIsAuth,
  selectIsAuthLoading,
  selectIsAuthUpdating,
} from '../../store/slice';

import type { FC, ReactNode } from 'react';

interface AuthWrapperProps {
  forPublic?: boolean;
  children?: ReactNode;
}

export const AuthWrapper: FC<AuthWrapperProps> = ({ children, forPublic }) => {
  const isAuth = useSelector(selectIsAuth);
  const isLoading = useSelector(selectIsAuthLoading);
  const isUpdating = useSelector(selectIsAuthUpdating);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const checkAuthorization = useCallback(() => {
    if (forPublic && isAuth) {
      const redirect = searchParams.get('redirect');
      if (redirect) {
        replace(redirect);
      } else {
        replace('/');
      }
    } else if (!forPublic && !isAuth) {
      replace('/login?redirect=' + pathname);
    }
  }, [forPublic, isAuth, pathname, replace, searchParams]);

  useEffect(() => {
    if (isLoading || isUpdating) return;

    checkAuthorization();
  }, [checkAuthorization, isLoading, isUpdating]);

  if (isLoading && !forPublic) {
    return (
      <Text
        as="h2"
        weight="bold"
        align="center"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2"
      >
        Загрузка...
      </Text>
    );
  }

  return children;
};

export default AuthWrapper;
