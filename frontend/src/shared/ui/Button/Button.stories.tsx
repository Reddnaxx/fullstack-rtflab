import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
  tags: ['ui', 'autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'danger', 'success'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me!',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Click me!',
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    children: 'Click me!',
    variant: 'text',
  },
};
