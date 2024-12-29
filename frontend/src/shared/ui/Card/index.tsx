import { cn } from '../../helpers/cn';

import type { FC, ReactNode } from 'react';

type CardVariant = 'raised' | 'outlined';

interface CardProps {
  variant?: CardVariant;
  children?: ReactNode;
}

const cardVariants = {
  raised: 'shadow-lg',
  outlined: 'border border-gray-300',
};

export const Card: FC<CardProps> = ({ children, variant = 'raised' }) => {
  const variantClasses = cardVariants[variant];

  return (
    <div className={cn('flex flex-col gap-2 rounded-md p-4', variantClasses)}>
      {children}
    </div>
  );
};

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
