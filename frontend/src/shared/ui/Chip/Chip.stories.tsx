import { Icon, IconButton } from '..';
import { Chip } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'shared/Layout/Chip',
  component: Chip,
  tags: ['layout', 'chip', 'autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'chip',
  },
};

export const WithSuffix: Story = {
  args: {
    children: 'chip',
    suffix: (
      <IconButton variant="flat" className="p-1">
        <Icon name="cross" width={18} height={18} />
      </IconButton>
    ),
  },
};
