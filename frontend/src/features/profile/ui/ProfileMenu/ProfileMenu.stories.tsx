import { ProfileMenu } from '.';
import { profileTabs } from '../../data';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProfileMenu> = {
  title: 'features/Profile',
  component: ProfileMenu,
  tags: ['profile', 'menu'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: profileTabs,
  },
};
