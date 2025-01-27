import { ProfileTabs } from '@/features/profile/ui';

import type { FC, ReactNode } from 'react';

const ProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col gap-8">
      <ProfileTabs />
      {children}
    </div>
  );
};

export default ProfileLayout;
