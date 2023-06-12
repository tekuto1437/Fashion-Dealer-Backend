import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

export const ImageFileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: any,
) => {
  if (!file.originalname.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)) {
    callback(
      new HttpException('Only images are allowed', HttpStatus.BAD_REQUEST),
      false,
    );
  }
  callback(null, true);
};
