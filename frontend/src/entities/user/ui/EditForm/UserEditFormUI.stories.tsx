import { UserEditFormUI } from './UserEditFormUI';

import type { UserEditFormScheme } from './UserEditFormUI';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'entities/User/UserEditForm',
  component: UserEditFormUI,
  tags: ['user', 'form'],
} satisfies Meta<typeof UserEditFormUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: {} as UserEditFormScheme,
    onSubmit: () => {},
  },
};
