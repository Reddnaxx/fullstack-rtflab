import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './index';

const meta = {
  title: 'shared/Text',
  component: Text,
  tags: ['ui', 'autodocs'],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Text',
  },
};

export const Span: Story = {
  args: {
    as: 'span',
    children: 'Span',
  },
};

export const Heading: Story = {
  args: {
    as: 'h1',
    children: 'Heading',
  },
};
