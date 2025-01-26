'use client';

import { useMemo } from 'react';

import { selectUser } from '@/features/auth/store/slice';
import { useAppSelector } from '@/shared/lib/hooks/store';

import { UserEditFormUI } from './UserEditFormUI';
import { patchUser } from '../../api';

import type { UserEditFormScheme } from './UserEditFormUI';

export const UserEditForm = () => {
  const user = useAppSelector(selectUser)!;
  const defaultValues = useMemo<UserEditFormScheme | null>(() => {
    if (!user) return null;

    const nameSplit = user.name.split(' ');

    return {
      email: user.email,
      telegram: user.telegram,
      about: user.about,
      skills: user.skills,
      lastName: nameSplit[0],
      firstName: nameSplit[1],
      patronymic: nameSplit[2],
    };
  }, [user]);

  const handleSubmit = (values: Partial<UserEditFormScheme>) => {
    const name = [values.lastName, values.firstName, values.patronymic].join(
      ' '
    );

    delete values.lastName;
    delete values.firstName;
    delete values.patronymic;

    patchUser(user.id, { ...values, name });
  };

  return (
    <UserEditFormUI defaultValues={defaultValues!} onSubmit={handleSubmit} />
  );
};

export default UserEditForm;
