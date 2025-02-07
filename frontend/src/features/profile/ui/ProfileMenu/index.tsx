import { forwardRef } from 'react';

import { cn } from '@/shared/lib/helpers/cn';
import { Button, Icon } from '@/shared/ui';
import { Card } from '@/shared/ui/Card';

import type { ProfileMenuTab } from '../../models/profile-menu-tab.interface';
import type { FC } from 'react';

interface ProfileMenuProps {
  tabs: ProfileMenuTab[];
  onClose: () => void;
  className?: string;
}

export const ProfileMenu = forwardRef<HTMLDivElement, ProfileMenuProps>(
  ({ tabs, onClose, className }, ref) => {
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
                <ProfileLinkTab tab={tab} onClose={onClose} />
              ) : (
                <ProfileButtonTab tab={tab} onClose={onClose} />
              )}
            </li>
          ))}
        </ul>
      </Card>
    );
  }
);

ProfileMenu.displayName = 'ProfileMenu';

type ProfileTabProps = { tab: ProfileMenuTab; onClose: () => void };

const ProfileLinkTab: FC<ProfileTabProps> = ({ tab, onClose: onClick }) => {
  const { route, title, icon } = tab;

  return (
    <Button
      href={route!}
      className="w-full font-bold text-black transition-colors"
      variant="text"
      prefix={icon && <Icon name={icon} />}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

const ProfileButtonTab: FC<ProfileTabProps> = ({ tab, onClose: onClick }) => {
  const { onClick: onTabClick, title, icon } = tab;

  const handleClick = () => {
    onTabClick?.();
    onClick();
  };

  return (
    <Button
      className="w-full font-bold text-black transition-colors"
      variant="text"
      onClick={handleClick}
      prefix={icon && <Icon name={icon} />}
    >
      {title}
    </Button>
  );
};

export default ProfileMenu;
