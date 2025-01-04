import { forwardRef } from 'react';

import { cn } from '../../lib/helpers/cn';

import type { ComponentProps, FC, ReactNode } from 'react';

type CardVariant = 'raised' | 'outlined';

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
  raised: 'shadow-md',
  outlined: 'border border-gray-300',
};

export const Card = forwardRef<HTMLDivElement & HTMLFormElement, CardProps>(
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
          'flex flex-col gap-2 rounded-xl p-4 bg-slate-50',
          variantClasses,
          className
        )}
        ref={ref}
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
  <div className={className}>{children}</div>
);

interface CardContentProps {
  className?: string;
  children?: ReactNode;
}

export const CardContent: FC<CardContentProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

interface CardActionsProps {
  className?: string;
  children?: ReactNode;
}

export const CardActions: FC<CardActionsProps> = ({ children, className }) => (
  <div className={cn('flex gap-1', className)}>{children}</div>
);

export default Card;
