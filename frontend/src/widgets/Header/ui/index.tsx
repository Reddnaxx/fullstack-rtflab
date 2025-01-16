'use client';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '@/features/auth/store/slice';
import { ProfileMenuButton } from '@/features/profile/ui';
import { cn } from '@/shared/lib/helpers/cn';
import { Button, Logo } from '@/shared/ui';

import type { FC } from 'react';

export const Header: FC = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <header className="container flex min-h-[5.625rem] items-center text-white">
      <Logo />
      {isAuth ? (
        <ProfileMenuButton className="ml-auto" />
      ) : (
        <HeaderAuthNav className="ml-auto" />
      )}
    </header>
  );
};

const HeaderAuthNav: FC<{ className?: string }> = ({ className }) => {
  return (
    <nav className={cn('flex gap-2', className)}>
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
