'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import { validateToken } from '@/features/auth/api';
import { LoadCurrentUserAction } from '@/features/auth/store/actions';
import { clearAuthError, setAuthFetched } from '@/features/auth/store/slice';
import { store } from '@/shared/lib/store';
import type { AppStore } from '@/shared/lib/store';

import type { FC, PropsWithChildren } from 'react';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <StoreProvider>{children}</StoreProvider>
);

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore | null>(null);
  const pathname = usePathname();

  if (!storeRef.current) {
    storeRef.current = store;
  }

  useEffect(() => {
    const currentStore = storeRef.current;

    if (!currentStore?.getState().auth.user) {
      validateToken().then(valid => {
        currentStore?.dispatch(
          valid ? LoadCurrentUserAction() : setAuthFetched()
        );
      });
    }

    if (currentStore?.getState().auth.error) {
      currentStore.dispatch(clearAuthError());
    }
  }, [pathname]);

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default Providers;
