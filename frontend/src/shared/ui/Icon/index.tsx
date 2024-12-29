import Image from 'next/image';

import { icons } from '../../constants/icons';
import { cn } from '../../helpers/cn';

import type { IconName } from './types';
import type { FC } from 'react';

interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
}

export const Icon: FC<IconProps> = ({
  name,
  width = 24,
  height = 24,
  alt = '',
  className,
}) => {
  const url = icons[name];

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={cn(className)}
    />
  );
};

export default Icon;

export * from '../../constants/icons';
export type * from './types';
