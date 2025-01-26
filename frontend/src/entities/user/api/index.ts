import { api } from '@/shared/lib/api';

import type { User } from '../models';

export async function patchUser(
  userId: string,
  data: Partial<User>
): Promise<User> {
  return api.patch(`/users/${userId}`, data).then(res => res.data);
}
