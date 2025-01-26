import { Header } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  title: 'widgets/Header',
  component: Header,
  decorators: [
    Story => (
      <div className="min-h-56">
        <Story />
      </div>
    ),
  ],
  tags: ['header'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
