import { forwardRef } from 'react';

import { cn } from '../../helpers/cn';

import type { FC, ReactNode } from 'react';

type CardVariant = 'raised' | 'outlined';

type CardComponent =
  | 'div'
  | 'header'
  | 'footer'
  | 'section'
  | 'nav'
  | 'article'
  | 'aside';

interface CardProps {
  as?: CardComponent;
  variant?: CardVariant;
  children?: ReactNode;
  className?: string;
}

const cardVariants = {
  raised: 'shadow-lg',
  outlined: 'border border-gray-300',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { children, className, as: asComponent = 'div', variant = 'raised' },
    ref
  ) => {
    const Component = asComponent;
    const variantClasses = cardVariants[variant];

    return (
      <Component
        className={cn(
          'flex flex-col gap-2 rounded-md p-4',
          variantClasses,
          className
        )}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps {
  children?: ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({ children }) => (
  <div>{children}</div>
);

interface CardContentProps {
  children?: ReactNode;
}

export const CardContent: FC<CardContentProps> = ({ children }) => (
  <div>{children}</div>
);

interface CardActionsProps {
  children?: ReactNode;
}

export const CardActions: FC<CardActionsProps> = ({ children }) => (
  <div className="flex gap-1">{children}</div>
);

export default Card;
