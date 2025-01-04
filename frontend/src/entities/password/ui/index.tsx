import { IconButton, Icon } from '@/shared/ui';

import type { FC } from 'react';

interface PasswordRevealButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

export const PasswordRevealButton: FC<PasswordRevealButtonProps> = ({
  onClick,
  isVisible,
}) => {
  return (
    <IconButton type="button" onClick={onClick} variant="flat">
      <Icon name={isVisible ? 'eye-slash' : 'eye'} />
    </IconButton>
  );
};

export default PasswordRevealButton;
