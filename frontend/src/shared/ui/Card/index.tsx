import { FC, ReactNode } from 'react';

interface CardProps {
  children?: ReactNode;
}

export const Card: FC<CardProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 rounded-md p-4 shadow-lg">
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
  <div>{children}</div>
);

export default Card;
