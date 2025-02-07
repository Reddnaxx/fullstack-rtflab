'use client';

import { useMemo } from 'react';

import { useGetFavoritesQuery } from '@/entities/card/api';
import { CardsList } from '@/entities/card/ui';

export const FavoritesPage = () => {
  const { data, isError, isLoading } = useGetFavoritesQuery();

  const cards = useMemo(() => {
    return data?.map(card => ({
      ...card,
      isFavorite: true,
    }));
  }, [data]);

  return (
    <div>
      <CardsList cards={cards} isError={isError} isLoading={isLoading} />
    </div>
  );
};
