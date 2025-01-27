'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import { AuthLoaderUI } from '..';
import { selectIsAuth, selectIsAuthFetched } from '../../store/slice';

import type { FC, ReactNode } from 'react';

interface AuthWrapperProps {
  forPublic?: boolean;
  children?: ReactNode;
}

export const AuthWrapper: FC<AuthWrapperProps> = ({ children, forPublic }) => {
  const isAuth = useSelector(selectIsAuth);
  const isFetched = useSelector(selectIsAuthFetched);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const checkAuthorization = useCallback(() => {
    if (forPublic && isAuth) {
      const redirect = searchParams.get('redirect');
      replace(redirect || '/');
    } else if (!forPublic && !isAuth) {
      replace(`/login?redirect=${pathname}`);
    }
  }, [forPublic, isAuth, pathname, replace, searchParams]);

  useLayoutEffect(() => {
    if (!isFetched) return;

    checkAuthorization();
  }, [checkAuthorization, isFetched]);

  if (!isFetched && !forPublic) {
    return <AuthLoaderUI />;
  }

  return children;
};

export default AuthWrapper;
