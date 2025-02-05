import { forwardRef } from 'react';

import { cn } from '../../lib/helpers/cn';

import type { ComponentProps, FC, ReactNode } from 'react';

type CardVariant = 'raised' | 'outlined' | 'flat';

type CardComponent =
  | 'div'
  | 'header'
  | 'footer'
  | 'section'
  | 'nav'
  | 'article'
  | 'aside'
  | 'form';

type HTMLProps = ComponentProps<'div'> & ComponentProps<'form'>;

type CardProps = HTMLProps & {
  as?: CardComponent;
  variant?: CardVariant;
};

const cardVariants = {
  raised: 'shadow-base',
  outlined: 'border border-gray-300',
  flat: 'border-none',
};

export const Card = forwardRef<HTMLDivElement | HTMLFormElement, CardProps>(
  (
    {
      children,
      className,
      as: asComponent = 'div',
      variant = 'raised',
      ...props
    },
    ref
  ) => {
    const Component = asComponent;
    const variantClasses = cardVariants[variant];

    return (
      <Component
        className={cn(
          'flex flex-col gap-2 rounded-xl p-4 bg-white',
          variantClasses,
          className
        )}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps {
  className?: string;
  children?: ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({ children, className }) => (
  <div className={cn('flex flex-col', className)}>{children}</div>
);

interface CardContentProps {
  className?: string;
  children?: ReactNode;
}

export const CardContent: FC<CardContentProps> = ({ children, className }) => (
  <div className={cn('flex flex-col flex-1', className)}>{children}</div>
);

interface CardActionsProps {
  className?: string;
  children?: ReactNode;
}

export const CardActions: FC<CardActionsProps> = ({ children, className }) => (
  <div className={cn('flex gap-1', className)}>{children}</div>
);

export default Card;
