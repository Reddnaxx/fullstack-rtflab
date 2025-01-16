import { createAsyncThunk } from '@reduxjs/toolkit';

import { login, logout, register } from '../api';

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
