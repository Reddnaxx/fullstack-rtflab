import { useState } from 'react';

import { ImageUploader } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'shared/Controls/ImageUploader',
  component: ImageUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['controls', 'image', 'autodocs'],
} satisfies Meta<typeof ImageUploader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultSrc: 'https://placehold.co/400',
    onImageChange: () => {},
    selectedImage: null,
  },
  render: props => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    return (
      <ImageUploader
        defaultSrc={props.defaultSrc}
        selectedImage={selectedImage}
        onImageChange={setSelectedImage}
        className="aspect-square w-72"
        label="Загрузить фото"
      />
    );
  },
};
