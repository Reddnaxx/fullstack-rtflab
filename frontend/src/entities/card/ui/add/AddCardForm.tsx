'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { TagsInput } from '@/entities/tag/ui';
import { Route } from '@/shared/types';
import { Button, Input, Text, TextArea } from '@/shared/ui';
import { Card, CardHeader, CardContent, CardActions } from '@/shared/ui/Card';

import type { FC } from 'react';

export const AddCardForm = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const searchParams = useSearchParams();

  const newType = useMemo(() => {
    return searchParams.get('newType') ?? 'resume';
  }, [searchParams]);

  return (
    <Card as="form" variant="flat" className="w-full max-w-xl gap-4">
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
          <AddCardFormResume skills={skills} setSkills={setSkills} />
        ) : (
          <AddCardFormVacancy skills={skills} setSkills={setSkills} />
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
}

const AddCardFormResume: FC<AddCardContentProps> = ({ skills, setSkills }) => {
  return (
    <>
      <Input
        label="Заголовок"
        placeholder="Напишите вашу роль в команде"
        className="mb-2"
      />

      <TagsInput
        label="Ключевые навыки"
        placeholder="Для разделения используйте ' , ' или ' ; '"
        tags={skills}
        onChange={setSkills}
      />
      <TextArea
        label="Описание"
        placeholder="Опишите чем вы хотите заниматься в проекте"
      />
    </>
  );
};

const AddCardFormVacancy: FC<AddCardContentProps> = ({ skills, setSkills }) => {
  return (
    <>
      <Input label="Заголовок" placeholder="Напишите роль, которую вы ищите" />
      <Input
        label="Команда"
        placeholder="Выберите вашу команду из списка"
        className="mb-2"
      />

      <TagsInput
        label="Требуемые навыки"
        placeholder="Для разделения используйте ' , ' или ' ; '"
        tags={skills}
        onChange={setSkills}
      />
      <TextArea
        label="Описание"
        placeholder="Опишите проект и требования к кандидату"
      />
    </>
  );
};
