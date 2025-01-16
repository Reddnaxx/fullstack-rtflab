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

import type { RegisterData } from '../../models/credentials';
import type { FC } from 'react';

export const registerFormSchema = z
  .object({
    email: z.string().email('Некорректный email'),
    firstName: z.string().min(2, 'Имя должно быть не менее 2 символов'),
    patronymic: z.string().optional(),
    lastName: z.string().min(2, 'Фамилия должна быть не менее 2 символов'),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
    passwordConfirmation: z.string().min(6, 'Повторите пароль'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirmation'],
        message: 'Пароли не совпадают',
      });
    }
  })
  .transform(data => ({
    ...data,
    passwordConfirmation: undefined,
  }));

export type RegisterFormScheme = z.infer<typeof registerFormSchema>;

interface RegisterFormUIProps {
  onSubmit: (data: RegisterData) => void;
  isSubmitting: boolean;
  error: string | null;
}

export const RegisterFormUI: FC<RegisterFormUIProps> = ({
  onSubmit,
  isSubmitting,
  error,
}) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<RegisterFormScheme>({
    resolver: zodResolver(registerFormSchema),
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
          Регистрация
        </Text>
      </CardHeader>

      <CardContent className="mb-2 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Input
            className="w-full"
            label="Email"
            autoComplete="email"
            type="email"
            error={errors.email?.message}
            required
            {...register('email')}
          />
          <div className="flex gap-4">
            <Input
              className="w-full"
              label="Фамилия"
              autoComplete="family-name"
              error={errors.lastName?.message}
              required
              {...register('lastName')}
            />
            <Input
              className="w-full"
              label="Имя"
              autoComplete="given-name"
              error={errors.firstName?.message}
              required
              {...register('firstName')}
            />
            <Input
              className="w-full"
              label="Отчество"
              autoComplete="additional-name"
              error={errors.patronymic?.message}
              {...register('patronymic')}
            />
          </div>

          <div className="mt-4 flex gap-4">
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
              required
              {...register('password')}
            />
            <Input
              className="w-full"
              label="Подтверждение пароля"
              type="password"
              error={errors.passwordConfirmation?.message}
              required
              {...register('passwordConfirmation')}
            />
          </div>
        </div>

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
          Зарегистрироваться
        </Button>
      </CardActions>
      <Button
        as="link"
        variant="text"
        replace
        href="/login"
        className="w-fit p-1"
      >
        Уже есть аккаунт?
      </Button>
    </Card>
  );
};

export default RegisterFormUI;
