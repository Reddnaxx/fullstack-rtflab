'use client';

import { useSearchParams } from 'next/navigation';

import { useGetCardsByTypeQuery } from '@/entities/card/api';
import { AddCardButton, CardsList } from '@/entities/card/ui';

export const MyCardsScreen = () => {
  const searchParams = useSearchParams();
  const { isError, isLoading, data } = useGetCardsByTypeQuery(
    searchParams.get('type') ?? undefined
  );

  return (
    <div>
      <CardsList
        cards={data}
        isError={isError}
        isLoading={isLoading}
        disableEmptyMessage={true}
      >
        <AddCardButton className="min-h-80" />
      </CardsList>
    </div>
  );
};
