import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { IconButton } from './index';

const meta: Meta<typeof IconButton> = {
  title: 'shared/IconButton',
  component: IconButton,
  tags: ['ui', 'autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'danger', 'success'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Image src="/svg/add-white.svg" alt="" width={24} height={24} />,
  },
};

export const Outlined: Story = {
  args: {
    children: <Image src="/svg/add.svg" alt="" width={24} height={24} />,
    variant: 'outlined',
  },
};

export const Flat: Story = {
  args: {
    children: <Image src="/svg/add.svg" alt="" width={24} height={24} />,
    variant: 'flat',
  },
};
