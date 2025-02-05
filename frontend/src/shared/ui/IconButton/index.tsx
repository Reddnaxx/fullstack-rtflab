import Link from 'next/link';

import { cn } from '@/shared/lib/helpers/cn';

import type { ComponentProps, FC, ReactNode } from 'react';

type IconButtonColor = 'primary' | 'danger' | 'success';

type IconButtonVariant = 'filled' | 'outlined' | 'flat';

type IconButtonInheritedProps = ComponentProps<'button'> &
  Partial<ComponentProps<typeof Link>>;

type IconButtonProps = IconButtonInheritedProps & {
  color?: IconButtonColor;
  variant?: IconButtonVariant;
  children?: ReactNode;
  href?: string;
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
  children,
  className,
  href,
  ...props
}) => {
  const colorClasses = iconButtonClasses[variant][color];
  const classes = cn(
    'p-2 text-white rounded-full transition-all active:scale-95 h-fit',
    colorClasses,
    className
  );

  if (href) {
    return (
      <Link className={classes} href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
