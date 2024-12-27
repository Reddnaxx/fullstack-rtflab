import type { Meta, StoryObj } from '@storybook/react';
import Logo from './index';

const meta: Meta<typeof Logo> = {
  title: 'shared/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['ui', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
