import { UserCard } from '..';

import type { ICard } from '../../models';
import type { FC, PropsWithChildren } from 'react';

interface CardsListProps {
  cards?: ICard[];
  isLoading?: boolean;
  isError?: boolean;
}

export const CardsList: FC<CardsListProps> = ({
  isLoading,
  isError,
  cards,
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

  return (
    <CardsListContainer>
      {cards.map(card => {
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
