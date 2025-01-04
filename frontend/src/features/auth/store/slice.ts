import { createSlice } from '@reduxjs/toolkit';

import type { User } from '@/entities/user/models';

import { loginReducers, registerReducers } from './asyncReducers';

export interface AuthState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isUpdating: false,
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
  },
  selectors: {
    selectUser: (state: AuthState) => state.user,
    selectIsAuth: (state: AuthState) => state.isAuth,
    selectIsAuthLoading: (state: AuthState) => state.isLoading,
    selectIsAuthUpdating: (state: AuthState) => state.isUpdating,
    selectError: (state: AuthState) => state.error,
  },
});

export const {
  selectUser,
  selectIsAuth,
  selectIsAuthLoading,
  selectIsAuthUpdating,
  selectError,
} = authSlice.selectors;

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;
