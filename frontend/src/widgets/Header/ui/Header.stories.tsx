import { Header } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  title: 'widgets/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['header', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
