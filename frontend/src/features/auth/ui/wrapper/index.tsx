'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Text } from '@/shared/ui';

import { selectIsAuth, selectIsAuthLoading } from '../../store/slice';

import type { FC, ReactNode } from 'react';

interface AuthWrapperProps {
  forPublic?: boolean;
  children?: ReactNode;
}

export const AuthWrapper: FC<AuthWrapperProps> = ({ children, forPublic }) => {
  const isAuth = useSelector(selectIsAuth);
  const isLoading = useSelector(selectIsAuthLoading);

  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (forPublic && isAuth) {
      replace('/');
    } else if (!forPublic && !isAuth) {
      replace('/login?redirect=' + pathname);
    }
  }, [isAuth, replace, pathname, forPublic, isLoading]);

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
