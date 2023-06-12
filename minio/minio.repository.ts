import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Client } from 'minio';
import * as crypto from 'crypto';

import { FileObject } from './interfaces/file-object.interface';
import { BucketType } from './interfaces/bucket-type.enum';

@Injectable()
export class MinioRepository {
  constructor(@Inject('MINIO_CONNECTION') private client: Client) {}

  async upload(
    fileName: string,
    fileType: string,
    fileBuffer: Buffer,
    type: BucketType,
  ): Promise<FileObject> {
    const bucketName =
      type === BucketType.IMAGES ? process.env.MINIO_IMAGES_BUCKET : '';
    const timestamp = Date.now().toString();
    const hashedImageName = crypto
      .createHash('md5')
      .update(timestamp)
      .digest('hex');
    const extension = fileName.substring(
      fileName.lastIndexOf('.'),
      fileName.length,
    );
    const metaData = {
      'Content-Type': fileType,
    };
    const newImageName = hashedImageName + extension;

    await this.client
      .putObject(bucketName, newImageName, fileBuffer, metaData)
      .catch((e) => {
        throw new HttpException(
          'Error while creating object: ' + e,
          HttpStatus.BAD_REQUEST,
        );
      });

    return <FileObject>{
      name: newImageName,
      url: `/${bucketName}/${newImageName}`,
    };
  }

  async delete(objectName: string, type: BucketType): Promise<void> {
    const bucketName =
      type === BucketType.IMAGES ? process.env.MINIO_IMAGES_BUCKET : '';
    const result = await this.client
      .removeObject(bucketName, objectName)
      .catch((e) => {
        throw new HttpException(
          'Error while Deleting object: ' + e,
          HttpStatus.BAD_REQUEST,
        );
      });
    return result;
  }
}
