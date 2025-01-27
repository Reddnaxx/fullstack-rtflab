import { ProfileTabs } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Widgets/Profile/ProfileTabs',
  component: ProfileTabs,
  tags: ['profile'],
} satisfies Meta<typeof ProfileTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
