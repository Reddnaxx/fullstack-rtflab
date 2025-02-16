import { Suspense } from 'react';

import { ProfileFilters } from '@/features/profile/ui';

import type { FC, ReactNode } from 'react';

const ProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col gap-4">
      <Suspense>
        <ProfileFilters />
      </Suspense>
      {children}
    </div>
  );
};

export default ProfileLayout;
