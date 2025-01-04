'use client';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '@/features/auth/store/slice';
import { ProfileMenuButton } from '@/features/profile/ui';
import { Button, Logo } from '@/shared/ui';

import type { FC } from 'react';

export const Header: FC = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <header className="container flex min-h-[5.625rem] items-center text-white">
      <Logo />
      {isAuth ? <ProfileMenuButton /> : <HeaderAuthNav />}
    </header>
  );
};

const HeaderAuthNav: FC = () => {
  return (
    <nav className="ml-auto flex gap-2">
      <Button
        as="link"
        href="/register"
        variant="outlined"
        className="rounded-full px-4"
      >
        Зарегистрироваться
      </Button>
      <Button as="link" href="/login" className="rounded-full px-6">
        Войти
      </Button>
    </nav>
  );
};

export default Header;
