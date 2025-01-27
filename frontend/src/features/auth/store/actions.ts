import { createAsyncThunk } from '@reduxjs/toolkit';

import { patchUser } from '@/entities/user/api';
import type { User } from '@/entities/user/models';
import type { RootState } from '@/shared/lib/store';

import { loadCurrentUser, login, logout, register } from '../api';

import type { LoginData, RegisterData } from '../models';

export const LoginAction = createAsyncThunk(
  'auth/login',
  async (data: LoginData) => login(data)
);

export const RegisterAction = createAsyncThunk(
  'auth/register',
  async (data: RegisterData) => register(data)
);

export const LogoutAction = createAsyncThunk('auth/logout', async () =>
  logout()
);

export const LoadCurrentUserAction = createAsyncThunk(
  'auth/loadUser',
  async () => loadCurrentUser()
);

export const PatchUserAction = createAsyncThunk(
  'auth/patchUser',
  async (data: Partial<User>, thunkApi) => {
    const { auth } = thunkApi.getState() as RootState;
    const userId = auth.user?.id;

    if (!userId) {
      throw new Error('User is not authenticated');
    }

    return patchUser(userId, data);
  }
);
