'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';

import { makeStore } from '@/shared/lib/store';
import type { AppStore } from '@/shared/lib/store';

import type { FC, PropsWithChildren } from 'react';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <StoreProvider>{children}</StoreProvider>
);

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default Providers;
