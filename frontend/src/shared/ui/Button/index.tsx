import Link from 'next/link';

import { cn } from '@/shared/lib/helpers/cn';

import {
  buttonClasses,
  buttonDisabledClasses,
  buttonSizeClasses,
} from './variants';

import type { ButtonColor, ButtonVariant, ButtonSize } from './types';
import type { ComponentProps, FC, ReactNode } from 'react';

type ButtonCommonProps = ComponentProps<'button'> &
  Partial<ComponentProps<typeof Link>>;

type ButtonProps = Omit<ButtonCommonProps, 'prefix'> & {
  as?: 'button' | 'link';
  noPaddings?: boolean;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  centered?: boolean;
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
  centered,
  className,
  ...props
}) => {
  const colorClasses = buttonClasses[variant][color];
  const sizeClasses = buttonSizeClasses[size];

  const classes = cn(
    'relative flex items-center gap-4 rounded-md text-left text-white transition-colors',
    colorClasses,
    sizeClasses,
    buttonDisabledClasses,
    { 'p-0': noPaddings },
    className
  );

  if (asComponent === 'link') {
    return (
      <ButtonLink
        className={classes}
        {...(props as ComponentProps<typeof Link>)}
      >
        <ButtonLayout prefix={prefix} suffix={suffix} centered={centered}>
          <span className="w-full">{children}</span>
        </ButtonLayout>
      </ButtonLink>
    );
  }

  return (
    <ButtonDefault className={classes} {...(props as ButtonDefaultProps)}>
      <ButtonLayout prefix={prefix} suffix={suffix} centered={centered}>
        <span className="w-full">{children}</span>
      </ButtonLayout>
    </ButtonDefault>
  );
};

const ButtonLayout: FC<ButtonProps> = ({
  children,
  prefix,
  suffix,
  centered,
}) => (
  <>
    {prefix && <ButtonIcon absolute={centered}>{prefix}</ButtonIcon>}
    <span className="w-full">{children}</span>
    {suffix && (
      <ButtonIcon right absolute={centered}>
        {suffix}
      </ButtonIcon>
    )}
  </>
);

interface ButtonIconProps {
  right?: boolean;
  absolute?: boolean;
  children?: ReactNode;
}

const ButtonIcon: FC<ButtonIconProps> = ({ children, right, absolute }) => (
  <span
    className={cn({
      'ml-auto': right,
      'mr-auto': !right,
      'absolute right-4': absolute && right,
      'absolute left-4': absolute && !right,
    })}
  >
    {children}
  </span>
);

type ButtonDefaultProps = ComponentProps<'button'>;

const ButtonDefault: FC<ButtonDefaultProps> = ({
  className,
  children,
  ...props
}) => (
  <button className={cn(className)} {...props}>
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
  <Link href={href} className={cn('min-w-fit', className)} {...props}>
    {children}
  </Link>
);

export default Button;
