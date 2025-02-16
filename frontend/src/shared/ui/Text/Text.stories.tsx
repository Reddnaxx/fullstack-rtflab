import { Text } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'shared/Layout/Text',
  component: Text,
  tags: ['ui', 'layout', 'autodocs'],
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
