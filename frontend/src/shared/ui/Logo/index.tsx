import Image from 'next/image';
import Link from 'next/link';

import type { FC } from 'react';

export const Logo: FC = () => (
  <Link href="/">
    <Image src="/svg/logo.svg" alt="Logo" width="150" height="30" />
  </Link>
);

export default Logo;
