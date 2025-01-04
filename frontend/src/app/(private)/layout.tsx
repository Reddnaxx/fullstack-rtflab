import { AuthWrapper } from '@/features/auth/ui/wrapper';

import type { FC, PropsWithChildren } from 'react';

const layout: FC<PropsWithChildren> = ({ children }) => {
  return <AuthWrapper>{children}</AuthWrapper>;
};

export default layout;
