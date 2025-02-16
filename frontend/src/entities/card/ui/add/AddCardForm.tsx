'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Route } from '@/shared/types';

import { AddCardFormUI } from './AddCardFormUI';
import { useCreateCardMutation } from '../../api';

import type { TAddCardForm } from './AddCardFormUI';
import type { FC } from 'react';

interface AddCardFormProps {
  redirectsBack?: boolean;
}

export const AddCardForm: FC<AddCardFormProps> = ({ redirectsBack }) => {
  const [skills, setSkills] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const [createCard] = useCreateCardMutation();
  const { push, back } = useRouter();

  const newType = useMemo(() => {
    return searchParams.get('newType') ?? 'resume';
  }, [searchParams]) as 'resume' | 'vacancy';

  const handleSubmit = (data: TAddCardForm) => {
    if (newType === 'resume') {
      delete data.team;
    }

    createCard(data).then(() => {
      if (redirectsBack) {
        back();
      } else {
        push(Route.MY_CARDS);
      }
      toast.success('Карточка успешно создана');
    });
  };

  return (
    <AddCardFormUI
      skills={skills}
      setSkills={setSkills}
      newType={newType}
      onSubmit={handleSubmit}
    />
  );
};
