'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

import { selectIsAdmin, selectIsAuth } from '@/features/auth/store/slice';
import { ProfileMenuButton } from '@/features/profile/ui';
import { cn } from '@/shared/lib/helpers/cn';
import { Route } from '@/shared/types';
import { Button, Icon, IconButton, Input, Logo } from '@/shared/ui';

import type { ChangeEvent, FC, SyntheticEvent } from 'react';

export const Header: FC = () => {
  const [search, setSearch] = useState('');
  const debouncedChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    push('/?' + params);
  }, 500);

  const isAuth = useSelector(selectIsAuth);
  const isAdmin = useSelector(selectIsAdmin);
  const searchParams = useSearchParams();
  const { push } = useRouter();

  useEffect(() => {
    if (searchParams.has('search')) {
      setSearch(searchParams.get('search') || '');
    }
  }, [searchParams]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setSearch(value);
    debouncedChange(value);
  };

  return (
    <header className="container flex min-h-[5.625rem] items-center text-white">
      <Logo />
      {isAdmin && <Icon name="admin" className="mb-5" />}
      {isAuth ? (
        <div className="flex w-full items-center justify-between gap-4">
          <HeaderSearchField
            className="mx-auto min-w-[40%]"
            value={search}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <div className="flex items-center gap-2">
            <IconButton href={Route.FAVORITES} variant="flat" className="p-1">
              <Icon name="favorite" width={28} height={28} />
            </IconButton>
            <ProfileMenuButton />
          </div>
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
        href={Route.REGISTER}
        variant="outlined"
        className="rounded-full px-4"
      >
        Зарегистрироваться
      </Button>
      <Button href={Route.LOGIN} className="rounded-full px-6">
        Войти
      </Button>
    </nav>
  );
};

interface HeaderSearchFieldProps {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: SyntheticEvent) => void;
  className?: string;
}

const HeaderSearchField: FC<HeaderSearchFieldProps> = ({
  handleChange,
  handleSubmit,
  value,
  className,
}) => (
  <form onSubmit={handleSubmit} className={cn(className)}>
    <Input
      className="w-full"
      label="Поиск"
      name="search"
      autoComplete="off"
      value={value}
      onChange={handleChange}
      placeholder="Введите название карточки"
      suffix={<Icon name="search" />}
      rounded="xl"
    />
  </form>
);

export default Header;
