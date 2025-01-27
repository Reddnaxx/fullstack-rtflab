import { useState } from 'react';

import { TagsInput } from './TagsInput';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'entities/Tags/TagsInput',
  component: TagsInput,
  tags: ['tags', 'input', 'autodocs'],
} satisfies Meta<typeof TagsInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tags: [],
    onChange: () => {},
    label: 'Навыки',
    placeholder: 'Например, JavaScript',
  },
  render: args => {
    const [tags, setTags] = useState(args.tags);
    return (
      <TagsInput
        tags={tags}
        onChange={setTags}
        placeholder={args.placeholder}
        label={args.label}
      />
    );
  },
};
