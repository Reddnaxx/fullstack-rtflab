'use client';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '@/features/auth/store/slice';
import { ProfileMenuButton } from '@/features/profile/ui';
import { cn } from '@/shared/lib/helpers/cn';
import { Route } from '@/shared/types';
import { Button, Icon, IconButton, Logo } from '@/shared/ui';

import type { FC } from 'react';

export const Header: FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const { push } = useRouter();

  return (
    <header className="container flex min-h-[5.625rem] items-center text-white">
      <Logo />
      {isAuth ? (
        <div className="ml-auto flex items-center gap-2">
          <IconButton
            onClick={() => push(Route.FAVORITES)}
            variant="flat"
            className="p-1"
          >
            <Icon name="favorite" width={28} height={28} />
          </IconButton>
          <ProfileMenuButton className="ml-auto" />
        </div>
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
        href={Route.REGISTER}
        variant="outlined"
        className="rounded-full px-4"
      >
        Зарегистрироваться
      </Button>
      <Button as="link" href={Route.LOGIN} className="rounded-full px-6">
        Войти
      </Button>
    </nav>
  );
};

export default Header;
