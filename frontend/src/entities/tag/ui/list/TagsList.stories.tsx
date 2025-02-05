import { TagsList } from './TagsList';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'entities/Tag/TagsList',
  component: TagsList,
  tags: ['tags', 'list', 'autodocs'],
} satisfies Meta<typeof TagsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tags: ['JavaScript', 'React', 'TypeScript'],
  },
};
