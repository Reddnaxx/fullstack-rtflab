'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PasswordRevealButton } from '@/entities/password/ui';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  Input,
  Text,
} from '@/shared/ui';

import type { Credentials } from '../../models/credentials';
import type { FC } from 'react';

export const loginFormSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
});

export type LoginFormScheme = z.infer<typeof loginFormSchema>;

interface LoginFormUIProps {
  onSubmit: (credentials: Credentials) => void;
  isSubmitting: boolean;
  error: string | null;
}

export const LoginFormUI: FC<LoginFormUIProps> = ({
  onSubmit,
  isSubmitting,
  error,
}) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginFormScheme>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <Card
      as="form"
      className="flex w-fit min-w-[36rem] flex-col gap-2 rounded-3xl px-20 py-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CardHeader>
        <Text
          as="h2"
          weight="bold"
          size="24"
          align="center"
          className="mb-10 uppercase"
        >
          Вход
        </Text>
      </CardHeader>

      <CardContent className="mb-2 flex flex-col gap-4">
        <Input
          className="w-full"
          label="Email"
          autoComplete="email"
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          className="w-full"
          label="Пароль"
          type={isPasswordVisible ? 'text' : 'password'}
          suffix={
            <PasswordRevealButton
              onClick={togglePasswordVisibility}
              isVisible={isPasswordVisible}
            />
          }
          error={errors.password?.message}
          {...register('password')}
        />

        {error && (
          <Text as="span" size="14" color="error">
            {error}
          </Text>
        )}
      </CardContent>

      <CardActions className="mt-4">
        <Button
          type="submit"
          size="lg"
          className="w-full text-center"
          suffix={
            isSubmitting ? (
              <Icon name={'loader'} className="animate-spin" />
            ) : undefined
          }
          centered
          disabled={isSubmitting || !isValid}
        >
          Вход
        </Button>
      </CardActions>
      <Button as="link" variant="text" href="/register" className="w-fit p-1">
        Нет аккаунта?
      </Button>
    </Card>
  );
};

export default LoginFormUI;
