'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { TagsInput } from '@/entities/tag/ui';
import { Route } from '@/shared/types';
import { Button, Input, Text, TextArea } from '@/shared/ui';
import { Card, CardHeader, CardContent, CardActions } from '@/shared/ui/Card';

import type { FC } from 'react';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

const addCardFormScheme = z.object({
  title: z.string(),
  skills: z.array(z.string()),
  about: z.string(),
  team: z.optional(z.string()),
});

export type TAddCardForm = z.infer<typeof addCardFormScheme>;

interface AddCardFormUIProps {
  skills: string[];
  setSkills: (skills: string[]) => void;
  newType: 'resume' | 'vacancy';
  onSubmit: (data: TAddCardForm) => void;
}

export const AddCardFormUI: FC<AddCardFormUIProps> = ({
  newType,
  skills,
  setSkills,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TAddCardForm>({
    resolver: zodResolver(addCardFormScheme),
  });

  return (
    <Card
      as="form"
      variant="flat"
      className="w-full max-w-xl gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CardHeader>
        <Text as="h2" size="20" align="center">
          Создание карточки
        </Text>
        <div className="mt-3 flex gap-2 *:w-full">
          <Button
            href={`${Route.ADD_CARD}`}
            replace
            color="primary"
            className="text-center"
            variant={newType === 'resume' ? 'filled' : 'outlined'}
          >
            Резюме
          </Button>
          <Button
            href={`${Route.ADD_CARD}?newType=vacancy`}
            replace
            color="primary"
            className="text-center"
            variant={newType === 'vacancy' ? 'filled' : 'outlined'}
          >
            Вакансия
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2 *:w-full">
        {newType === 'resume' ? (
          <AddCardFormResume
            skills={skills}
            setSkills={setSkills}
            register={register}
            setValue={setValue}
            errors={errors}
          />
        ) : (
          <AddCardFormVacancy
            skills={skills}
            setSkills={setSkills}
            register={register}
            setValue={setValue}
            errors={errors}
          />
        )}
      </CardContent>
      <CardActions className="flex">
        <Button type="submit" className="px-12 text-center">
          Создать
        </Button>
        <Button
          href={Route.MY_CARDS}
          color="danger"
          className="px-8 text-center"
        >
          Отмена
        </Button>
      </CardActions>
    </Card>
  );
};

interface AddCardContentProps {
  skills: string[];
  setSkills: (skills: string[]) => void;
  register: UseFormRegister<TAddCardForm>;
  setValue: UseFormSetValue<TAddCardForm>;
  errors: FieldErrors<TAddCardForm>;
}

const AddCardFormResume: FC<AddCardContentProps> = ({
  skills,
  setSkills,
  register,
  setValue,
  errors,
}) => {
  return (
    <>
      <Input
        label="Заголовок"
        placeholder="Напишите вашу роль в команде"
        className="mb-2"
        error={errors.title?.message}
        {...register('title')}
      />

      <TagsInput
        label="Ключевые навыки"
        placeholder="Для разделения используйте ' , ' или ' ; '"
        tags={skills}
        onChange={value => {
          setSkills(value);
          setValue('skills', value, {
            shouldDirty: true,
          });
        }}
      />
      <TextArea
        label="Описание"
        placeholder="Опишите чем вы хотите заниматься в проекте"
        error={errors.about?.message}
        {...register('about')}
      />
    </>
  );
};

const AddCardFormVacancy: FC<AddCardContentProps> = ({
  skills,
  setSkills,
  register,
  setValue,
  errors,
}) => {
  return (
    <>
      <Input
        label="Заголовок"
        placeholder="Напишите роль, которую вы ищите"
        error={errors.title?.message}
        {...register('title')}
      />
      <Input
        label="Команда"
        placeholder="Выберите вашу команду из списка"
        className="mb-2"
        error={errors.team?.message}
        {...register('team')}
      />

      <TagsInput
        label="Требуемые навыки"
        placeholder="Для разделения используйте ' , ' или ' ; '"
        tags={skills}
        onChange={value => {
          setSkills(value);
          setValue('skills', value, {
            shouldDirty: true,
          });
        }}
      />
      <TextArea
        label="Описание"
        placeholder="Опишите проект и требования к кандидату"
        error={errors.about?.message}
        {...register('about')}
      />
    </>
  );
};
