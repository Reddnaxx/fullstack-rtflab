import { RegisterForm } from './RegisterForm';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'features/Auth/RegisterForm',
  component: RegisterForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['auth', 'form'],
} satisfies Meta<typeof RegisterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
