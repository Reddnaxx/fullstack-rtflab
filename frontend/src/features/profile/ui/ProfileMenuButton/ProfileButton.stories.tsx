'use client';

import { ProfileMenuButton } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProfileMenuButton> = {
  title: 'features/Profile/MenuButton',
  component: ProfileMenuButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['profile', 'menu'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
