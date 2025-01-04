import { Button } from './index';

import type { Meta, StoryObj } from '@storybook/react';

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

export const Link: Story = {
  args: {
    children: 'Go to ...',
    href: '/',
    as: 'link',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Click me!',
    disabled: true,
  },
};

export const WithPrefix: Story = {
  args: {
    children: 'Click me!',
    prefix: '👍',
  },
};

export const WithSuffix: Story = {
  args: {
    children: 'Click me!',
    suffix: '👍',
  },
};
