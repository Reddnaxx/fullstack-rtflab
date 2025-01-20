'use client';

import { useRef, useState } from 'react';

import { cn } from '@/shared/lib/helpers/cn';
import { useOnOutsideClick } from '@/shared/lib/hooks/useOnOutsideClick';
import { IconButton, Icon } from '@/shared/ui';

import { profileTabs } from '../../data';
import { ProfileMenu } from '../ProfileMenu';

import type { FC } from 'react';

interface ProfileMenuButtonProps {
  className?: string;
}

export const ProfileMenuButton: FC<ProfileMenuButtonProps> = ({
  className,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(isOpen => !isOpen);
  };

  useOnOutsideClick(() => setIsMenuOpen(false), menuRef);

  return (
    <div className={cn('relative', className)}>
      <IconButton
        color={'primary'}
        variant={'flat'}
        noPadding
        className={className}
        onClick={toggleMenu}
      >
        <Icon name={'profile'} width={32} height={32} />
      </IconButton>
      {isMenuOpen && (
        <ProfileMenu
          onClose={() => setIsMenuOpen(false)}
          tabs={profileTabs}
          ref={menuRef}
          className="absolute right-0 top-full w-56 animate-rollout200"
        />
      )}
    </div>
  );
};

export default ProfileMenuButton;
