import { api } from '@/shared/lib/api';

import type { User } from '../models';

export async function patchUser(
  userId: string,
  data: Partial<User>
): Promise<User> {
  const skills = JSON.stringify(data.skills);
  return api
    .patchForm(`/users/${userId}`, { ...data, skills })
    .then(res => res.data);
}
