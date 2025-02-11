import Link from 'next/link';

import { cn } from '@/shared/lib/helpers/cn';
import { Route } from '@/shared/types';
import { Icon } from '@/shared/ui';
import { Card } from '@/shared/ui/Card';

import type { FC } from 'react';

interface AddCardButtonProps {
  className?: string;
}

export const AddCardButton: FC<AddCardButtonProps> = ({ className }) => {
  return (
    <Link href={Route.ADD_CARD} className={cn('block group', className)}>
      <Card className="flex h-full items-center justify-center border-2 bg-zinc-50 transition-all  hover:border-black/20 hover:shadow-2xl">
        <Icon name="add" width={64} height={64} />
      </Card>
    </Link>
  );
};
