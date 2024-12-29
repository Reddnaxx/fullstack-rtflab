import Link from 'next/link';

import type { IProfileTab } from '../../interfaces/profile-tab.interface';
import type { FC } from 'react';

interface ProfileMenuProps {
  tabs: IProfileTab[];
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ tabs }) => {
  return (
    <nav>
      <ul>
        {tabs.map(tab => (
          <li key={tab.route}>
            {tab.route ? (
              <ProfileLinkTab tab={tab} />
            ) : (
              <ProfileButtonTab tab={tab} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

type ProfileTabProps = { tab: IProfileTab };

const ProfileLinkTab: FC<ProfileTabProps> = ({ tab }) => {
  const { route, title } = tab;

  return <Link href={route!}>{title}</Link>;
};

const ProfileButtonTab: FC<ProfileTabProps> = ({ tab }) => {
  const { onClick, title } = tab;

  return <button onClick={onClick!}>{title}</button>;
};

export default ProfileMenu;
