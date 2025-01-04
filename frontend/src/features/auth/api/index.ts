import type { User } from '@/entities/user/models';
import api from '@/shared/lib/api';

import type { LoginData, RegisterData } from '../models/credentials';

export function login(data: LoginData): Promise<User> {
  return api.get('auth', { data });
}

export function register(data: RegisterData): Promise<User> {
  return api.post('auth/register', { data });
}
