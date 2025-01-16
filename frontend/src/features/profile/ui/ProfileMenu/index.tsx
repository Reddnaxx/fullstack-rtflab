import { forwardRef } from 'react';

import { cn } from '@/shared/lib/helpers/cn';
import { Button, Card, Icon } from '@/shared/ui';

import type { IProfileTab } from '../../models/profile-tab.interface';
import type { FC } from 'react';

interface ProfileMenuProps {
  tabs: IProfileTab[];
  className?: string;
}

export const ProfileMenu = forwardRef<HTMLDivElement, ProfileMenuProps>(
  ({ tabs, className }, ref) => {
    return (
      <Card
        as="nav"
        className={cn('w-fit overflow-hidden', className)}
        ref={ref}
      >
        <ul>
          {tabs.map(tab => (
            <li key={tab.title}>
              {tab.route ? (
                <ProfileLinkTab tab={tab} />
              ) : (
                <ProfileButtonTab tab={tab} />
              )}
            </li>
          ))}
        </ul>
      </Card>
    );
  }
);

ProfileMenu.displayName = 'ProfileMenu';

type ProfileTabProps = { tab: IProfileTab };

const ProfileLinkTab: FC<ProfileTabProps> = ({ tab }) => {
  const { route, title, icon } = tab;

  return (
    <Button
      as="link"
      href={route!}
      className="w-full font-bold text-black transition-colors"
      variant="text"
      prefix={icon && <Icon name={icon} />}
    >
      {title}
    </Button>
  );
};

const ProfileButtonTab: FC<ProfileTabProps> = ({ tab }) => {
  const { onClick, title, icon } = tab;

  return (
    <Button
      className="w-full font-bold text-black transition-colors"
      variant="text"
      onClick={onClick}
      prefix={icon && <Icon name={icon} />}
    >
      {title}
    </Button>
  );
};

export default ProfileMenu;
