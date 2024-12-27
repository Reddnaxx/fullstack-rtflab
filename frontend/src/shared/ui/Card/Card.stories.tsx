import type { Meta, StoryObj } from '@storybook/react';

import { Card, CardActions, CardContent, CardHeader } from './index';
import { Text } from '@/shared/ui';

const meta: Meta<typeof Card> = {
  title: 'shared/Card',
  component: Card,
  tags: ['ui', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <Text as="h2">Card title</Text>
        </CardHeader>
        <CardContent>content</CardContent>
        <CardActions>
          <button>Button 1</button>
          <button>Button 2</button>
        </CardActions>
      </>
    ),
  },
};
