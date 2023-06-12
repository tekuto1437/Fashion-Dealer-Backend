import { Module } from '@nestjs/common';
import { PrismaModule } from '../Prisma/prisma/prisma.module';
import { AppService } from './app.service';
import { ApiModule } from "../API/api.module";
import { MinioModule } from 'minio/minio.module';

@Module({
  imports: [ApiModule, PrismaModule, MinioModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
