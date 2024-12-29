import { Button, Text } from '@/shared/ui';

import { Card, CardActions, CardContent, CardHeader } from './index';

import type { Meta, StoryObj } from '@storybook/react';

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
          <Text as="h2">Lorem ipsum dolor sit amet.</Text>
        </CardHeader>
        <CardContent>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            accusamus fuga dicta voluptates dolorum nulla iste commodi expedita!
            Aut totam similique nobis ad, sapiente quae itaque saepe commodi
            consequatur hic libero tenetur quam. Magni ducimus, error maiores
            earum, saepe soluta animi exercitationem voluptatibus atque
            dignissimos fuga eum debitis blanditiis odit!
          </p>
        </CardContent>
        <CardActions>
          <Button size="sm">Button 1</Button>
          <Button size="sm">Button 2</Button>
        </CardActions>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <CardHeader>
          <Text as="h2">Card title</Text>
        </CardHeader>
        <CardContent>content</CardContent>
        <CardActions>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </CardActions>
      </>
    ),
  },
};
