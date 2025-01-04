import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { authSlice } from '@/features/auth/store/slice';

const rootReducer = combineSlices(authSlice);

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: true,
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
