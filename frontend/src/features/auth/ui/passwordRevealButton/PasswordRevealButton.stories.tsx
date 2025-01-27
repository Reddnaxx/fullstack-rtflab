import { PasswordRevealButton } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'features/Auth/PasswordRevealButton',
  component: PasswordRevealButton,
  tags: ['button', 'password', 'autodocs'],
} satisfies Meta<typeof PasswordRevealButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Hide: Story = {
  args: {
    onClick: () => {},
    isVisible: true,
  },
};

export const Show: Story = {
  args: {
    onClick: () => {},
    isVisible: false,
  },
};
