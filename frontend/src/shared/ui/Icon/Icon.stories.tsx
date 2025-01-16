import { Icon } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'shared/Layout/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['ui', 'layout', 'autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'profile',
  },
};
