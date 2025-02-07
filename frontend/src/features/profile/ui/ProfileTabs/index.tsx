'use client';

import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/helpers/cn';
import { Button } from '@/shared/ui';

import { profileTabs } from '../../constants';

export const ProfileTabs = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2">
      {profileTabs.map(tab => (
        <Button
          key={tab.title}
          href={tab.route}
          variant="text"
          className={cn(
            'rounded-b-none px-8 font-roboto-condensed uppercase font-medium',
            pathname === tab.route
              ? 'border-b-2 border-sky-500'
              : 'border-0 text-gray-600'
          )}
        >
          {tab.title}
        </Button>
      ))}
    </nav>
  );
};

export default ProfileTabs;
