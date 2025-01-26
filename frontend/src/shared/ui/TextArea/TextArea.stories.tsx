import Image from 'next/image';

import { TextArea } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextArea> = {
  title: 'shared/Controls/TextArea',
  component: TextArea,
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

export const Invalid: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    prefix: <Image src="/svg/email.svg" alt="" width={24} height={24} />,
    defaultValue: 'example#mail.ru',
    error: 'Invalid email format',
  },
};
