'use client';

import { cn } from '@/shared/lib/helpers/cn';

import type { FC, ReactNode } from 'react';
import type { ClassNameValue } from 'tailwind-merge';

type ChipColor = 'blue' | 'red' | 'green' | 'default';

interface ChipProps {
  children: ReactNode;
  color?: ChipColor;
  suffix?: ReactNode;
}

const colors: Record<ChipColor, ClassNameValue> = {
  blue: 'bg-blue-500 text-white hover:bg-blue-600',
  red: 'bg-red-500 text-white hover:bg-red-600',
  green: 'bg-green-500 text-white hover:bg-green-600',
  default: 'bg-gray-300/50 text-gray-800 hover:bg-gray-400/50',
};

export const Chip: FC<ChipProps> = ({
  children,
  suffix,
  color = 'default',
}) => {
  return (
    <span
      className={cn(
        'flex w-fit cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1 text-sm transition-colors',
        colors[color],
        suffix && 'pr-1'
      )}
    >
      {children}
      {suffix}
    </span>
  );
};

export default Chip;
