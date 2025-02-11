import { ProfileFilters } from '@/features/profile/ui';

import type { FC, ReactNode } from 'react';

const ProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col gap-4">
      <ProfileFilters />
      {children}
    </div>
  );
};

export default ProfileLayout;
