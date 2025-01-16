import { LoginAction, LogoutAction, RegisterAction } from './actions';

import type { AuthBuilder } from './slice';

export const loginReducers = (builder: AuthBuilder) => {
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

export const registerReducers = (builder: AuthBuilder) => {
  builder.addCase(RegisterAction.pending, state => {
    state.isLoading = true;
  });
  builder.addCase(RegisterAction.fulfilled, (state, { payload: user }) => {
    state.isLoading = false;
    state.isAuth = true;
    state.user = user;
    state.error = null;
  });
  builder.addCase(RegisterAction.rejected, (state, { error }) => {
    state.isLoading = false;
    state.error = error.message ?? 'Unknown error';
  });
};

export const logoutReducers = (builder: AuthBuilder) => {
  builder.addCase(LogoutAction.pending, state => {
    state.isLoading = true;
  });
  builder.addCase(LogoutAction.fulfilled, state => {
    state.isLoading = false;
    state.isAuth = false;
    state.user = null;
    state.error = null;
  });
  builder.addCase(LogoutAction.rejected, (state, { error }) => {
    state.isLoading = false;
    state.error = error.message ?? 'Unknown error';
  });
};
