import { LoginForm } from './LoginForm';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'features/Auth/LoginForm',
  component: LoginForm,
  tags: ['auth', 'form', 'autodocs'],
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
