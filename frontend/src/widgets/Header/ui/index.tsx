import { ProfileMenuButton } from '@/features/profile/ui';
import { Logo } from '@/shared/ui';

import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="container flex min-h-[5.625rem] items-center text-white">
      <Logo />
      <ProfileMenuButton className="ml-auto" />
    </header>
  );
};

export default Header;
