'use client';

import { UserCard } from '..';
import { useGetAllCardsQuery } from '../../api';

import type { FC, PropsWithChildren } from 'react';

export const CardsList = () => {
  const { data, isLoading, isError } = useGetAllCardsQuery();

  if (isLoading || !data) {
    return (
      <CardsListContainer>
        {[...Array(8)].map((_, index) => (
          <li key={index}>
            <UserCard.Loading />
          </li>
        ))}
      </CardsListContainer>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <CardsListContainer>
      {data.map(card => {
        return (
          <li key={card.id}>
            <UserCard {...card} />
          </li>
        );
      })}
    </CardsListContainer>
  );
};

const CardsListContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
      {children}
    </ul>
  );
};

export default CardsList;
