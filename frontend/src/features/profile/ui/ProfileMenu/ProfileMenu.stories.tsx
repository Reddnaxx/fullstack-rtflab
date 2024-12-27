import type { Meta, StoryObj } from '@storybook/react';

import { profileTabs } from '../../data';
import ProfileMenu from './index';

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
