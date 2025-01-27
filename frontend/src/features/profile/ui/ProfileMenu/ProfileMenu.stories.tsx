import { ProfileMenu } from '.';
import { profileMenuTabs } from '../../constants';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProfileMenu> = {
  title: 'features/Profile/Menu',
  component: ProfileMenu,
  tags: ['profile', 'menu'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: profileMenuTabs,
  },
};
