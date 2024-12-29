import Link from 'next/link';

import { cn } from '@/shared/helpers/cn';

import { buttonClasses, buttonSizeClasses } from './variants';

import type { ButtonColor, ButtonVariant, ButtonSize } from './types';
import type { ComponentProps, FC, ReactNode } from 'react';

type ButtonCommonProps = ComponentProps<'button'> & ComponentProps<'a'>;

type ButtonProps = Omit<ButtonCommonProps, 'prefix'> & {
  as?: 'button' | 'link';
  noPaddings?: boolean;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  as: asComponent = 'button',
  color = 'primary',
  variant = 'filled',
  size = 'md',
  noPaddings,
  children,
  prefix,
  suffix,
  className,
  ...props
}) => {
  const colorClasses = buttonClasses[variant][color];
  const sizeClasses = buttonSizeClasses[size];

  const classes = cn(
    'text-white rounded-md transition-colors',
    colorClasses,
    sizeClasses,
    { 'p-0': noPaddings },
    className
  );

  if (asComponent === 'link') {
    return (
      <ButtonLink
        className={classes}
        {...(props as ComponentProps<typeof Link>)}
      >
        {prefix}
        <span className="mr-auto">{children}</span>
        {suffix}
      </ButtonLink>
    );
  }

  return (
    <ButtonDefault className={classes} {...(props as ButtonDefaultProps)}>
      {prefix}
      <span className="mr-auto">{children}</span>
      {suffix}
    </ButtonDefault>
  );
};

type ButtonDefaultProps = ComponentProps<'button'>;

const ButtonDefault: FC<ButtonDefaultProps> = ({
  className,
  children,
  ...props
}) => (
  <button
    className={cn(
      'flex gap-3 text-white rounded-md transition-colors text-left',
      className
    )}
    {...props}
  >
    {children}
  </button>
);

type ButtonLinkProps = ComponentProps<typeof Link>;

const ButtonLink: FC<ButtonLinkProps> = ({
  className,
  children,
  href,
  ...props
}) => (
  <Link
    href={href}
    className={cn(
      'flex gap-3 text-white rounded-md transition-colors min-w-fit text-left',
      className
    )}
    {...props}
  >
    {children}
  </Link>
);

export default Button;
