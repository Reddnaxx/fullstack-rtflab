'use client';

import { useParams, useRouter } from 'next/navigation';

import { useGetCardByIdQuery } from '@/entities/card/api';
import { UserCard } from '@/entities/card/ui';

export const CardScreen = () => {
  const { id } = useParams();
  const { isLoading, isError, data: card } = useGetCardByIdQuery(id as string);
  const { replace } = useRouter();

  if (isError) {
    replace('/404');
    return null;
  }

  if (isLoading) {
    return (
      <div>
        <UserCard.Loading />
      </div>
    );
  }

  return <UserCard {...card!} />;
};
