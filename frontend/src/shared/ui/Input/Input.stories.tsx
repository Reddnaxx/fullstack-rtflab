import Image from 'next/image';

import { Input } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'shared/Controls/Input',
  component: Input,
  tags: ['ui', 'control', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'label',
    placeholder: 'placeholder',
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    prefix: <Image src="/svg/email.svg" alt="" width={24} height={24} />,
  },
};

export const WithSuffix: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    suffix: <Image src="/svg/eye.svg" alt="" width={24} height={24} />,
    type: 'password',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    prefix: <Image src="/svg/email.svg" alt="" width={24} height={24} />,
    defaultValue: 'example#mail.ru',
    error: 'Invalid email format',
  },
};
