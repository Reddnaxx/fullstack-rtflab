'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { Route } from '@/shared/types';
import { Button } from '@/shared/ui';

export const ProfileFilters = () => {
  const searchParams = useSearchParams();

  const type = useMemo(() => searchParams.get('type'), [searchParams]);

  return (
    <div className="flex items-center gap-1">
      <Button
        href={`${Route.MY_CARDS}`}
        variant={!type ? 'filled' : 'outlined'}
        className="rounded-xl"
      >
        Все
      </Button>
      <Button
        href={`${Route.MY_CARDS}?type=resume`}
        variant={type === 'resume' ? 'filled' : 'outlined'}
        className="rounded-xl"
      >
        Резюме
      </Button>
      <Button
        href={`${Route.MY_CARDS}?type=vacancy`}
        variant={type === 'vacancy' ? 'filled' : 'outlined'}
        className="rounded-xl"
      >
        Вакансии
      </Button>
    </div>
  );
};
