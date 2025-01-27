import {
  LoadCurrentUserAction,
  LoginAction,
  LogoutAction,
  PatchUserAction,
  RegisterAction,
} from './actions';

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
    state.isFetched = true;
  });
  builder.addCase(LoginAction.rejected, (state, { error }) => {
    state.isLoading = false;
    state.error = error.message ?? 'Unknown error';
    state.isFetched = true;
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
    state.isFetched = true;
  });
  builder.addCase(RegisterAction.rejected, (state, { error }) => {
    state.isLoading = false;
    state.error = error.message ?? 'Unknown error';
    state.isFetched = true;
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

export const loadCurrentUserReducers = (builder: AuthBuilder) => {
  builder.addCase(LoadCurrentUserAction.pending, state => {
    state.isUpdating = true;
  });
  builder.addCase(
    LoadCurrentUserAction.fulfilled,
    (state, { payload: user }) => {
      state.isUpdating = false;
      state.isAuth = true;
      state.user = user;
      state.error = null;
      state.isFetched = true;
    }
  );
  builder.addCase(LoadCurrentUserAction.rejected, (state, { error }) => {
    state.isUpdating = false;
    state.isAuth = false;
    state.user = null;
    state.error = error.message ?? 'Unknown error';
    state.isFetched = true;
  });
};

export const patchUserReducers = (builder: AuthBuilder) => {
  builder.addCase(PatchUserAction.pending, state => {
    state.isUpdating = true;
  });
  builder.addCase(PatchUserAction.fulfilled, (state, { payload: user }) => {
    state.isUpdating = false;
    state.user = user;
    state.error = null;
  });
  builder.addCase(PatchUserAction.rejected, (state, { error }) => {
    state.isUpdating = false;
    state.error = error.message ?? 'Unknown error';
  });
};
