'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { TagsInput } from '@/entities/tag/ui';
import { IMAGE_SCHEMA } from '@/shared/types';
import { Button, ImageUploader, Input, Text, TextArea } from '@/shared/ui';
import { Card, CardContent, CardHeader } from '@/shared/ui/Card';

import type { FC, ReactNode, SyntheticEvent } from 'react';

const formScheme = z.object({
  lastName: z.string().min(1, 'Это обязательное поле'),
  firstName: z.string().min(1, 'Это обязательное поле'),
  patronymic: z.optional(z.string()),
  email: z
    .string()
    .email('Неправильный формат почты')
    .min(1, 'Это обязательное поле'),
  telegram: z.optional(
    z.string().superRefine((value, ctx) => {
      if (value) {
        if (!value.startsWith('@')) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Имя пользователя должно начинаться с "@"',
          });
        }

        if (value.length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Имя пользователя не должно быть пустым',
          });
        }
      }
    })
  ),
  about: z.optional(z.string()),
  skills: z.optional(z.array(z.string())),
  avatar: z.optional(IMAGE_SCHEMA).or(z.string()),
});

export type UserEditFormScheme = z.infer<typeof formScheme>;

interface UserEditFormProps {
  isSubmitting?: boolean;
  defaultValues: UserEditFormScheme;
  onSubmit: (values: UserEditFormScheme) => void;
}

export const UserEditFormUI: FC<UserEditFormProps> = ({
  onSubmit,
  defaultValues,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid, errors, isDirty },
  } = useForm<UserEditFormScheme>({
    resolver: zodResolver(formScheme),
    mode: 'onChange',
    defaultValues,
  });

  const [skills, setSkills] = useState<string[]>(defaultValues?.skills ?? []);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleTagsChange = (value: string[]) => {
    setSkills(value);
    setValue('skills', value, {
      shouldDirty: true,
    });
  };

  const handleReset = (e: SyntheticEvent) => {
    e.preventDefault();

    reset(defaultValues);
    setSkills(defaultValues.skills ?? []);
    setSelectedImage(null);
  };

  return (
    <form
      className="flex flex-col items-start gap-12 md:flex-row"
      onSubmit={handleSubmit(onSubmit)}
      onReset={handleReset}
    >
      <ImageUploader
        defaultSrc={defaultValues.avatar ?? 'https://placehold.co/200'}
        onImageChange={setSelectedImage}
        selectedImage={selectedImage}
        className="aspect-square min-w-72 flex-1 md:min-w-40"
        label="Загрузить фото"
        error={errors.avatar?.message?.toString()}
        {...register('avatar')}
      />
      <div className="flex flex-[5] flex-col gap-6">
        <div className="flex  flex-col gap-14 sm:flex-row">
          <UserEditFormGroup title="Личная информация">
            <Input
              label="Фамилия"
              autoComplete="family-name"
              placeholder="Иванов"
              required
              error={errors.lastName?.message}
              {...register('lastName')}
            />
            <Input
              label="Имя"
              autoComplete="given-name"
              placeholder="Иван"
              required
              error={errors.firstName?.message}
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
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Telegram"
              placeholder="@Username"
              error={errors.telegram?.message}
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
          <TagsInput
            onChange={handleTagsChange}
            tags={skills}
            max={10}
            label="Навыки"
            placeholder="Введите навык и нажмите ' , ' или ' ; ' "
          ></TagsInput>
        </UserEditFormGroup>
        <div className="flex gap-2">
          <Button
            type="submit"
            color="success"
            disabled={isSubmitting || !isDirty || !isValid}
          >
            Сохранить
          </Button>
          <Button
            type="reset"
            variant="text"
            color="danger"
            disabled={isSubmitting || !isDirty}
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
