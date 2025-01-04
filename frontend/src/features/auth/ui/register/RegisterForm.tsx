'use client';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/store';

import { RegisterFormUI } from './RegisterFormUI';
import { RegisterAction } from '../../store/actions';
import { selectError, selectIsAuthLoading } from '../../store/slice';

import type { RegisterData } from '../../models/credentials';

export const RegisterForm = () => {
  const dispatcher = useAppDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsAuthLoading);

  const handleSubmit = (data: RegisterData) => {
    dispatcher(RegisterAction(data));
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
