import { LoginAction } from './actions';

import type { AuthState } from './slice';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';

export const loginReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(LoginAction.pending, state => {
    state.isLoading = true;
  });
  builder.addCase(LoginAction.fulfilled, (state, { payload: user }) => {
    state.isLoading = false;
    state.isAuth = true;
    state.user = user;
    state.error = null;
  });
  builder.addCase(LoginAction.rejected, (state, { error }) => {
    state.isLoading = false;
    state.error = error.message ?? 'Unknown error';
  });
};
