import { cn } from '@/shared/lib/helpers/cn';

import type { ComponentProps, FC, ReactNode } from 'react';

type IconButtonColor = 'primary' | 'danger' | 'success';

type IconButtonVariant = 'filled' | 'outlined' | 'flat';

type IconButtonProps = ComponentProps<'button'> & {
  color?: IconButtonColor;
  variant?: IconButtonVariant;
  noPadding?: boolean;
  children?: ReactNode;
};

const iconButtonClasses = {
  filled: {
    primary: 'bg-sky-500 hover:bg-sky-400 active:bg-sky-300 text-white',
    danger: 'bg-red-500 hover:bg-red-400 active:bg-red-300 text-white',
    success: 'bg-green-500 hover:bg-green-400 active:bg-green-300 text-white',
  },
  outlined: {
    primary:
      'border-2 border-sky-500 text-sky-500 hover:bg-sky-50 active:bg-sky-100',
    danger:
      'border-2 border-red-500 text-red-500 hover:bg-red-50 active:bg-sky-100',
    success:
      'border-2 border-green-500 text-green-500 hover:bg-green-50 active:bg-sky-100',
  },
  flat: {
    primary: 'text-sky-500 hover:bg-sky-50 active:bg-sky-100',
    danger: 'text-red-500 hover:bg-red-50 active:bg-sky-100',
    success: 'text-green-500 hover:bg-green-50 active:bg-sky-100',
  },
};

export const IconButton: FC<IconButtonProps> = ({
  color = 'primary',
  variant = 'filled',
  noPadding,
  children,
  className,
  ...props
}) => {
  const colorClasses = iconButtonClasses[variant][color];

  return (
    <button
      className={cn(
        'p-2 text-white rounded-full transition-all active:scale-95',
        colorClasses,
        { 'p-0': noPadding },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
