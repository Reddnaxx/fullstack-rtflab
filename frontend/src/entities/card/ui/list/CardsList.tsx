import { Text } from '@/shared/ui';

import { UserCard } from '..';

import type { ICard } from '../../models';
import type { FC, PropsWithChildren, ReactNode } from 'react';

interface CardsListProps {
  cards?: ICard[];
  isLoading?: boolean;
  isError?: boolean;
  disableEmptyMessage?: boolean;
  children?: ReactNode;
}

export const CardsList: FC<CardsListProps> = ({
  isLoading,
  isError,
  cards,
  disableEmptyMessage,
  children,
}) => {
  if (isLoading || !cards) {
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

  if (!cards.length && !disableEmptyMessage) {
    return (
      <Text size="24" weight="bold" align="center" className="p-5">
        Пока здесь пусто
      </Text>
    );
  }

  return (
    <CardsListContainer>
      {cards.map(card => {
        return (
          <li key={card.id}>
            <UserCard {...card} />
          </li>
        );
      })}
      {children}
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
