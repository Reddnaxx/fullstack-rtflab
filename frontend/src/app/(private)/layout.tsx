import { AuthWrapper } from '@/features/auth/ui';

import type { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const layout: FC<LayoutProps> = ({ children }) => {
  return <AuthWrapper>{children}</AuthWrapper>;
};

export default layout;
