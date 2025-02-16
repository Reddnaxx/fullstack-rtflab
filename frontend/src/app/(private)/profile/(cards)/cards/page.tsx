import { Suspense } from 'react';

import { MyCardsScreen } from '@/screens/MyCards/ui';

const ProfileCards = () => {
  return (
    <Suspense>
      <MyCardsScreen />
    </Suspense>
  );
};

export default ProfileCards;
