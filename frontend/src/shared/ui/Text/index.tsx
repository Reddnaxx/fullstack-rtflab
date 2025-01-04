import { cn } from '@/shared/lib/helpers/cn';

import {
  textAlignClasses,
  textColorClasses,
  textFontFamilyClasses,
  textSizeClasses,
  textWeightClasses,
} from './variants';

import type {
  TextAlignment,
  TextColor,
  TextFontFamily,
  TextSize,
  TextVariant,
  TextWeight,
} from './types';
import type { FC, ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
  as?: TextVariant;
  align?: TextAlignment;
  fontFamily?: TextFontFamily;
  className?: string;
}

export const Text: FC<TextProps> = ({
  children,
  className,
  size = '16',
  color = 'default',
  weight = 'normal',
  fontFamily = 'roboto',
  as: asComponent = 'p',
  align = 'left',
}) => {
  const Component = asComponent;

  if (fontFamily !== 'roboto-condensed' && asComponent === 'h2') {
    fontFamily = 'roboto-condensed';
  }

  const sizeClasses = textSizeClasses[size];
  const colorClasses = textColorClasses[color];
  const weightClasses = textWeightClasses[weight];
  const alignClasses = textAlignClasses[align];
  const fontFamilyClasses = textFontFamilyClasses[fontFamily];

  return (
    <Component
      className={cn(
        sizeClasses,
        colorClasses,
        weightClasses,
        alignClasses,
        fontFamilyClasses,
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Text;
