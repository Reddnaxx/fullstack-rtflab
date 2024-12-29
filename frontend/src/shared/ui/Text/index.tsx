import { cn } from '@/shared/helpers/cn';

import {
  textColorClasses,
  textSizeClasses,
  textWeightClasses,
} from './variants';

import type { TextColor, TextSize, TextVariant, TextWeight } from './types';
import type { FC, ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
  as?: TextVariant;
  className?: string;
}

export const Text: FC<TextProps> = ({
  children,
  className,
  size = '16',
  color = 'default',
  weight = 'normal',
  as: asComponent = 'p',
}) => {
  const Component = asComponent;

  const sizeClasses = textSizeClasses[size];
  const colorClasses = textColorClasses[color];
  const weightClasses = textWeightClasses[weight];

  return (
    <Component
      className={cn(sizeClasses, colorClasses, weightClasses, className)}
    >
      {children}
    </Component>
  );
};

export default Text;
