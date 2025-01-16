import type { User } from '@/entities/user/models';
import { api } from '@/shared/lib/api';

import type { LoginData, RegisterData } from '../models/credentials';

export async function login(data: LoginData): Promise<User> {
  return api.post('auth', data);
}

export async function register(data: RegisterData): Promise<User> {
  return api.post('auth/register', data);
}

export async function logout(): Promise<void> {
  return api.post('auth/logout');
}
