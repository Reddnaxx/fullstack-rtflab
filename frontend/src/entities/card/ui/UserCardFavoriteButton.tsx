'use client';
import { memo } from 'react';

import { Icon, IconButton } from '@/shared/ui';

import { useFavoriteMutation } from '../api';

import type { FC, SyntheticEvent } from 'react';

interface UserCardFavoriteButtonProps {
  cardId: string;
  isFavorite: boolean;
}
export const UserCardFavoriteButton: FC<UserCardFavoriteButtonProps> = memo(
  ({ cardId, isFavorite }) => {
    const [favorite] = useFavoriteMutation();

    const handleClick = (e: SyntheticEvent) => {
      e.preventDefault();
      favorite({ id: cardId, isFavorite });
    };

    return (
      <IconButton variant="flat" onClick={handleClick}>
        <Icon name={isFavorite ? 'favoriteActive' : 'favorite'} />
      </IconButton>
    );
  }
);

UserCardFavoriteButton.displayName = 'UserCardFavoriteButton';
