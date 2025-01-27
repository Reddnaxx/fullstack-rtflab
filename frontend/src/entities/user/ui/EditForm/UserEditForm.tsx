'use client';

import { useMemo } from 'react';
import { toast } from 'react-toastify';

import { PatchUserAction } from '@/features/auth/store/actions';
import {
  selectIsAuthUpdating,
  selectUserWithSplitName,
} from '@/features/auth/store/slice';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/store';

import { UserEditFormUI } from './UserEditFormUI';

import type { UserEditFormScheme } from './UserEditFormUI';

export const UserEditForm = () => {
  const userWithSplitName = useAppSelector(selectUserWithSplitName);
  const isSubmitting = useAppSelector(selectIsAuthUpdating);
  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => {
    const data = { ...userWithSplitName };

    delete data.name;
    delete data.id;
    delete data.roles;

    return data as UserEditFormScheme;
  }, [userWithSplitName]);

  const handleSubmit = (values: Partial<UserEditFormScheme>) => {
    const name = [values.lastName, values.firstName, values.patronymic].join(
      ' '
    );

    delete values.lastName;
    delete values.firstName;
    delete values.patronymic;

    dispatch(PatchUserAction({ ...values, name })).then(() => {
      toast.success('Данные успешно обновлены');
    });
  };

  return (
    <UserEditFormUI
      defaultValues={defaultValues!}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default UserEditForm;
