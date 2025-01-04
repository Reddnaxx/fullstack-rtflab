import { createSlice } from '@reduxjs/toolkit';

import type { User } from '@/entities/user/models';

import { loginReducers } from './asyncReducers';

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
  reducers: {},
  extraReducers: builder => {
    loginReducers(builder);
  },
  selectors: {
    selectUser: (state: AuthState) => state.user,
    selectIsAuth: (state: AuthState) => state.isAuth,
    selectIsLoading: (state: AuthState) => state.isLoading,
    selectIsUpdating: (state: AuthState) => state.isUpdating,
    selectError: (state: AuthState) => state.error,
  },
});

export const {
  selectUser,
  selectIsAuth,
  selectIsLoading,
  selectIsUpdating,
  selectError,
} = authSlice.selectors;

export default authSlice.reducer;
