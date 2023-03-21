import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { MulterOptions as MulterOptionsInterface } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';

export class MulterOptions implements MulterOptionsInterface {
  constructor(private readonly destination: string) {}

  storage = diskStorage({
    destination: join(__dirname, '../..', 'uploads', this.destination),
    filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}${extname(file.originalname)}`);
    },
  });

  fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new BadRequestException('Only image files are allowed!'), false);
    }
    cb(null, true);
  };

  get multerOptions(): multer.Options {
    return {
      storage: this.storage,
      fileFilter: this.fileFilter,
      limits: {
        fileSize: 15728640 // 15MB in bytes
      }
    };
  }
}