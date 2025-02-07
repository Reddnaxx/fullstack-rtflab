'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useGetAllCardsQuery } from '@/entities/card/api';
import { CardsList } from '@/entities/card/ui';
import { selectUser } from '@/features/auth/store/slice';
import { useAppSelector } from '@/shared/lib/hooks/store';

export const CardsFullList = () => {
  const searchParams = useSearchParams();
  const { data, isLoading, isError, refetch } = useGetAllCardsQuery(
    searchParams.get('search') || undefined
  );
  const user = useAppSelector(selectUser);

  useEffect(() => {
    refetch();
  }, [user, refetch, searchParams]);

  return (
    <CardsList isLoading={isLoading} isError={isError} cards={data || []} />
  );
};
