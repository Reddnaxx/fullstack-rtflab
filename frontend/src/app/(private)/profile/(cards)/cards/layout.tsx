import type { FC, ReactNode } from 'react';

const CardsLayout: FC<{ children: ReactNode; modal: ReactNode }> = ({
  children,
  modal,
}) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default CardsLayout;
