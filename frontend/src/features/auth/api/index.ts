import type { User } from '@/entities/user/models';
import { api } from '@/shared/lib/api';

import type { LoginData, RegisterData } from '../models/credentials';

export async function login(data: LoginData): Promise<User> {
  return api.post('auth/login', data).then(async res => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return res.data;
  });
}

export async function register(data: RegisterData): Promise<User> {
  return api.post('auth/register', data).then(async res => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return res.data;
  });
}

export async function logout(): Promise<void> {
  return api.post('auth/logout').then(res => res.data);
}

export async function validateToken(): Promise<boolean> {
  return api.post('auth/validate').then(res => res.data['result']);
}

export async function loadCurrentUser(): Promise<User | null> {
  return api.get('users/current').then(res => res.data);
}
