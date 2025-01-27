import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit/react';

import type { User } from '@/entities/user/models';

import {
  loadCurrentUserReducers,
  loginReducers,
  logoutReducers,
  patchUserReducers,
  registerReducers,
} from './asyncReducers';

import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';

export type AuthBuilder = ActionReducerMapBuilder<AuthState>;

export interface AuthState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  isFetched: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isUpdating: false,
  isFetched: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    loginReducers(builder);
    registerReducers(builder);
    logoutReducers(builder);
    loadCurrentUserReducers(builder);
    patchUserReducers(builder);
  },
  selectors: {
    selectUser: (state: AuthState) => state.user,
    selectIsAuth: (state: AuthState) => state.isAuth,
    selectIsAuthLoading: (state: AuthState) => state.isLoading,
    selectIsAuthUpdating: (state: AuthState) => state.isUpdating,
    selectIsAuthFetched: (state: AuthState) => state.isFetched,
    selectError: (state: AuthState) => state.error,
  },
});

export const selectUserWithSplitName = createDraftSafeSelector(
  authSlice.selectors.selectUser,
  user => {
    if (!user) {
      return null;
    }

    const [lastName, firstName, patronymic] = user.name.split(' ');

    return {
      ...user,
      firstName,
      lastName,
      patronymic,
      name: undefined,
    };
  }
);

export const {
  selectUser,
  selectIsAuth,
  selectIsAuthLoading,
  selectIsAuthUpdating,
  selectIsAuthFetched,
  selectError,
} = authSlice.selectors;

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;
