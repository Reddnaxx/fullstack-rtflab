'use client';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/store';

import { RegisterFormUI } from './RegisterFormUI';
import { RegisterAction } from '../../store/actions';
import { selectError, selectIsAuthLoading } from '../../store/slice';

import type { RegisterFormSchema } from './RegisterFormUI';

export const RegisterForm = () => {
  const dispatcher = useAppDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsAuthLoading);

  const handleSubmit = (data: RegisterFormSchema) => {
    const name = [data.lastName, data.firstName, data.patronymic].join(' ');

    dispatcher(
      RegisterAction({
        email: data.email,
        name,
        password: data.password,
      })
    );
  };

  return (
    <RegisterFormUI
      onSubmit={handleSubmit}
      isSubmitting={isLoading}
      error={error}
    />
  );
};

export default RegisterForm;
