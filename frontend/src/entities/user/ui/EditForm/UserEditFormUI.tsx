'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Text,
  TextArea,
} from '@/shared/ui';

import type { FC, ReactNode } from 'react';

const formScheme = z.object({
  lastName: z.string().min(1),
  firstName: z.string().min(1),
  patronymic: z.string().optional(),
  email: z.string().email().min(1),
  telegram: z.string().startsWith('@').optional(),
  about: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

export type UserEditFormScheme = z.infer<typeof formScheme>;

interface UserEditFormProps {
  defaultValues: UserEditFormScheme;
  onSubmit: (values: UserEditFormScheme) => void;
}

export const UserEditFormUI: FC<UserEditFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const { register, handleSubmit, reset, getValues } =
    useForm<UserEditFormScheme>({
      resolver: zodResolver(formScheme),
      mode: 'onChange',
      defaultValues,
    });

  return (
    <form
      className="flex items-start gap-12"
      onSubmit={handleSubmit(() => onSubmit(getValues()))}
    >
      <div className="relative aspect-square flex-1 overflow-hidden rounded-lg border border-gray-400">
        <Image src="https://placehold.co/400" alt="" fill />
      </div>
      <div className="flex flex-[5] flex-col gap-6">
        <div className="flex gap-14">
          <UserEditFormGroup title="Личная информация">
            <Input
              label="Фамилия"
              autoComplete="family-name"
              placeholder="Иванов"
              required
              {...register('lastName')}
            />
            <Input
              label="Имя"
              autoComplete="given-name"
              placeholder="Иван"
              required
              {...register('firstName')}
            />
            <Input
              label="Отчество"
              placeholder="Иванович"
              autoComplete="additional-name"
              {...register('patronymic')}
            />
          </UserEditFormGroup>
          <UserEditFormGroup title="Контактная информация">
            <Input
              label="Почта"
              type="email"
              autoComplete="email"
              placeholder="example@mail.ru"
              required
              {...register('email')}
            />
            <Input
              label="Telegram"
              placeholder="@Username"
              {...register('telegram')}
            />
          </UserEditFormGroup>
        </div>
        <UserEditFormGroup title="Дополнительная информация">
          <TextArea
            label="О себе"
            placeholder="Напишите о своих увлечения, личностных качествах и опыте"
            {...register('about')}
          />
          <TextArea label="Навыки" {...register('skills')} />
        </UserEditFormGroup>
        <div className="flex gap-2">
          <Button type="submit" color="success">
            Сохранить
          </Button>
          <Button
            type="button"
            variant="text"
            color="danger"
            onClick={() => reset()}
          >
            Отмена
          </Button>
        </div>
      </div>
    </form>
  );
};

interface UserEditFormGroupProps {
  title: string;
  children: ReactNode;
}

const UserEditFormGroup: FC<UserEditFormGroupProps> = ({ title, children }) => {
  return (
    <Card className="flex-1 p-0" variant="flat">
      <CardHeader className="mb-2">
        <Text as="h3" size="18" className="text-gray-600">
          {title}
        </Text>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 *:w-full">
        {children}
      </CardContent>
    </Card>
  );
};

export default UserEditFormUI;
