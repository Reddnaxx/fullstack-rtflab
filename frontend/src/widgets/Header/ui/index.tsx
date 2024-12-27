import { Logo } from '@/shared/ui';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="container flex min-h-[5.625rem] items-center text-white">
      <Logo />
    </header>
  );
};

export default Header;
