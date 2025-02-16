'use client';
import Image from 'next/image';
import { forwardRef } from 'react';

import { allowedImages } from '@/shared/constants/files';
import { cn } from '@/shared/lib/helpers/cn';

import { Icon, Text } from '..';

import type { ChangeEvent, ComponentProps } from 'react';

type ImageInputProps = Omit<ComponentProps<'input'>, 'type' | 'accept'> & {
  defaultSrc: string;
  label?: string;
  error?: string;
  selectedImage: File | null;
  onImageChange: (file: File | null) => void;
};

export const ImageUploader = forwardRef<HTMLInputElement, ImageInputProps>(
  (
    {
      className,
      defaultSrc,
      onChange,
      label,
      error,
      onImageChange,
      selectedImage,
      ...props
    },
    ref
  ) => {
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      onImageChange(file || null);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      handleImageChange(event);
      onChange?.(event);
    };

    return (
      <label className={cn('relative group cursor-pointer block', className)}>
        <div className="relative size-full overflow-hidden rounded-lg">
          <Image
            src={
              selectedImage ? URL.createObjectURL(selectedImage) : defaultSrc
            }
            className="object-cover"
            alt="Выбранное изображение"
            fill
            unoptimized
            priority
            sizes="100%"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <Icon name="edit" width={48} height={48} />
          </div>
        </div>

        <input
          type="file"
          accept={allowedImages.join(', ')}
          onChange={handleChange}
          className="hidden"
          aria-label="Выбрать изображение"
          ref={ref}
          {...props}
        />

        {(error || label) && (
          <Text
            className={cn('w-full', {
              'text-red-500': !!error,
            })}
            align="center"
            size="14"
          >
            {error ? error : label}
          </Text>
        )}
      </label>
    );
  }
);

ImageUploader.displayName = 'ImageUploader';

export default ImageUploader;
