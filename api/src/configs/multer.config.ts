import { extname } from 'path';

import type { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const staticFolder = 'uploads';

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: `./${staticFolder}`,
    filename: (req, file, callback) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return callback(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
      callback(null, true);
    } else {
      callback(new Error('Неподдерживаемый формат файла'), false);
    }
  },
};
