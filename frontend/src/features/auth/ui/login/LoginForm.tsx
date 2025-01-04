'use client';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/store';

import { LoginFormUI } from './LoginFormUI';
import { LoginAction } from '../../store/actions';
import { selectError, selectIsAuthLoading } from '../../store/slice';

import type { Credentials } from '../../models/credentials';

export const LoginForm = () => {
  const dispatcher = useAppDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsAuthLoading);

  const handleSubmit = (credentials: Credentials) => {
    dispatcher(LoginAction(credentials));
  };

  return (
    <LoginFormUI
      onSubmit={handleSubmit}
      isSubmitting={isLoading}
      error={error}
    />
  );
};

export default LoginForm;
