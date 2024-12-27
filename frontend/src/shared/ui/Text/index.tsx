import { cn } from '@/shared/helpers/cn';
import { FC, ReactNode } from 'react';
import { TextColor, TextSize, TextVariant } from './types';

const textColorMap: Record<TextColor, string> = {
  default: 'text-black',
  primary: 'text-sky-500',
  error: 'text-red-500',
  success: 'text-green-500',
};

interface TextProps {
  children: ReactNode;
  size?: TextSize;
  color?: TextColor;
  as?: TextVariant;
}

export const Text: FC<TextProps> = ({
  children,
  size = '16',
  color = 'default',
  as: asComponent = 'p',
}) => {
  const Component = asComponent;
  const colorClass = textColorMap[color];

  return (
    <Component className={cn(`text-${size}`, colorClass)}>{children}</Component>
  );
};

export default Text;
