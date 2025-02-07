import { z } from 'zod';

import { allowedImages, fileSizeLimitMB } from '../constants/files';

export const IMAGE_SCHEMA = z
  .any()
  .refine(
    (files: FileList) => {
      if (!files?.length) {
        return true;
      }

      const file = files[0];

      return allowedImages.includes(file.type);
    },
    { message: 'Неразрешенный тип файла' }
  )
  .refine(
    files => {
      if (!files?.length) {
        return true;
      }

      return files[0].size <= fileSizeLimitMB * 1024 * 1024;
    },
    {
      message: `Размер файла не должен превышать ${fileSizeLimitMB} МБ`,
    }
  )
  .transform(files => {
    if (!files?.length) {
      return null;
    }

    return files[0];
  });
