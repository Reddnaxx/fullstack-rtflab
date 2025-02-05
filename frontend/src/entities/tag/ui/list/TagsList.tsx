import { Chip } from '@/shared/ui';

import type { FC } from 'react';

interface TagsListProps {
  tags: string[];
}

export const TagsList: FC<TagsListProps> = ({ tags }) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <li key={tag}>
          <Chip>{tag}</Chip>
        </li>
      ))}
    </ul>
  );
};
