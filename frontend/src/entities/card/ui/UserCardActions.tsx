'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui';

import { useArchiveCardMutation } from '../api';
import { CardStatus } from '../models';

import type { FC, SyntheticEvent } from 'react';

interface UserCardActionsProps {
  id: string;
  isOwner: boolean;
  status: CardStatus;
}

export const UserCardActions: FC<UserCardActionsProps> = ({
  id,
  isOwner,
  status,
}) => {
  const [archive] = useArchiveCardMutation();
  const { push } = useRouter();

  const handleEditClick = (e: SyntheticEvent) => {
    e.preventDefault();
    push(`/card/${id}/edit`);
  };

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    archive(id);
  };

  return (
    <>
      {isOwner ? (
        <>
          <Button onClick={handleEditClick}>Изменить</Button>
          {status === CardStatus.ACTIVE ? (
            <Button color="danger" onClick={handleClick}>
              В архив
            </Button>
          ) : (
            <Button color="success" onClick={handleClick}>
              Вернуть из архива
            </Button>
          )}
        </>
      ) : (
        <Button onClick={handleClick}>Откликнуться</Button>
      )}
    </>
  );
};
