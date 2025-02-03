import { z } from 'zod';

import { allowedImages, fileSizeLimitMB } from '../constants/files';

export const IMAGE_SCHEMA = z
  .any()
  .refine(
    (files: FileList) => {
      const file = files[0];

      if (!file?.type) {
        return false;
      }

      return allowedImages.includes(file.type);
    },
    { message: 'Неразрешенный тип файла' }
  )
  .refine(files => files[0].size <= fileSizeLimitMB * 1024 * 1024, {
    message: `Размер файла не должен превышать ${fileSizeLimitMB} МБ`,
  })
  .transform(files => files[0]);
