'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import { clearAuthError } from '@/features/auth/store/slice';
import { makeStore } from '@/shared/lib/store';
import type { AppStore } from '@/shared/lib/store';

import type { FC, PropsWithChildren } from 'react';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <StoreProvider>{children}</StoreProvider>
);

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore | null>(null);
  const pathname = usePathname();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    storeRef.current?.dispatch(clearAuthError());
  }, [pathname]);

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default Providers;
