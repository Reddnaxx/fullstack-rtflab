import { Suspense } from 'react';

import { CardsFullList } from '@/widgets/CardsFullList/ui';

import type { FC } from 'react';

export const HomePage: FC = () => {
  return (
    <div>
      <Suspense>
        <CardsFullList />
      </Suspense>
    </div>
  );
};

export default HomePage;
