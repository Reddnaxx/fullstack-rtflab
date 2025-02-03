import { api } from '@/shared/lib/api';

import type { User } from '../models';
import type { UserEditFormScheme } from '../ui/EditForm';

export async function patchUser(
  userId: string,
  data: UserEditFormScheme
): Promise<User> {
  const skills = JSON.stringify(data.skills);
  return api
    .patchForm(`/users/${userId}`, { ...data, skills })
    .then(res => res.data);
}
