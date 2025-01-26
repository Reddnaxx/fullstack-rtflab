import { AuthLoaderUI } from './AuthLoaderUI';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'features/Auth/AuthLoader',
  component: AuthLoaderUI,
  tags: ['auth', 'loader'],
} satisfies Meta<typeof AuthLoaderUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isActive: true,
  },
};
