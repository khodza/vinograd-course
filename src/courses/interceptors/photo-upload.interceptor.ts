import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export class MulterOptions {
  constructor() {
    return {
      storage: diskStorage({
        destination: join(__dirname, '../../..', 'uploads','courses'),
        filename: (req, file, cb) => {
          const origName = file.originalname.replace(/\s+/g, '');
          const name = `${origName}-${Date.now()}`;
          return cb(null, `${name}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new BadRequestException('Only image files are allowed!'), false);
        }
        if (file.size > 15728640) {
          return cb(new BadRequestException('File size should be no more than 15 MB!'), false);
        }
        cb(null, true);
      },
    };
  }
}