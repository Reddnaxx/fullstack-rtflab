import { cn } from '@/shared/helpers/cn';

import { buttonClasses, buttonSizeClasses } from './variants';

import type { ButtonColor, ButtonVariant, ButtonSize } from './types';
import type { ComponentProps, FC, ReactNode } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  color = 'primary',
  variant = 'filled',
  size = 'md',
  children,
  className,
  ...props
}) => {
  const colorClasses = buttonClasses[variant][color];
  const sizeClasses = buttonSizeClasses[size];

  return (
    <button
      className={cn(
        'text-white rounded-md transition-colors',
        colorClasses,
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
