import { Global, Module } from '@nestjs/common';
import { Client } from 'minio';

import { MinioRepository } from './minio.repository';

@Global()
@Module({
  providers: [
    MinioRepository,
    {
      provide: 'MINIO_CONNECTION',
      useFactory: () => {
        return new Client({
          endPoint: process.env.MINIO_ENDPOINT,
          port: +process.env.MINIO_PORT,
          useSSL: false,
          accessKey: process.env.MINIO_ACCESS_KEY,
          secretKey: process.env.MINIO_SECRET_KEY,
        });
      },
    },
  ],
  exports: [MinioRepository],
})
export class MinioModule {}
