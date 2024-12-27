import type { Meta, StoryObj } from '@storybook/react';
import { HomePage } from '.';

const meta: Meta<typeof HomePage> = {
  title: 'pages/Home',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    pageLayout: true,
  },
  tags: ['home', 'autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
