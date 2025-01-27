'use client';

import { useCallback, useEffect, useId, useRef } from 'react';

import { Chip, Icon, IconButton } from '@/shared/ui';

import type { FC } from 'react';

interface TagsInputProps {
  tags: string[];
  label?: string;
  placeholder?: string;
  max?: number;
  onChange: (tags: string[]) => void;
}

export const TagsInput: FC<TagsInputProps> = ({
  tags,
  onChange: setTags,
  label,
  placeholder,
  max = 10,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const id = useId();

  const removeTag = (tag: string) => {
    const newTags = tags.filter(t => t !== tag);
    setTags(newTags);
  };

  const addTag = useCallback(() => {
    const tag = ref.current?.value.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    ref.current!.value = '';
  }, [setTags, tags]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ',' || e.key === ';') {
        e.preventDefault();
        addTag();
      }
    };

    const input = ref.current;

    input?.addEventListener('keydown', handleKeyDown);

    return () => {
      input?.removeEventListener('keydown', handleKeyDown);
    };
  }, [addTag]);

  return (
    <>
      <label htmlFor={id} className="text-lg">
        {label} ({tags.length}/{max})
      </label>
      <div className="flex flex-col rounded-md border border-gray-400 p-3 outline outline-0 -outline-offset-1 outline-blue-500 hover:border-black has-[input:disabled]:bg-gray-100 has-[input:focus]:outline-2">
        {!!tags.length && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map(tag => (
              <Chip
                key={tag}
                suffix={<TagRemoveButton tag={tag} removeTag={removeTag} />}
              >
                {tag}
              </Chip>
            ))}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          type="text"
          placeholder={
            tags.length < max
              ? placeholder
              : 'Выбрано максимальное кол-во элементов'
          }
          onBlur={addTag}
          disabled={tags.length >= max}
          autoComplete="off"
          className="h-full text-lg outline-none"
        />
      </div>
    </>
  );
};

interface TagRemoveButtonProps {
  tag: string;
  removeTag: (tag: string) => void;
}

const TagRemoveButton: FC<TagRemoveButtonProps> = ({ removeTag, tag }) => {
  return (
    <IconButton
      type="button"
      variant="flat"
      className="p-1"
      onClick={() => removeTag(tag)}
    >
      <Icon name="cross" width={18} height={18} />
    </IconButton>
  );
};

export default TagsInput;
