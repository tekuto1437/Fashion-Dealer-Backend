import { Module } from '@nestjs/common';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [],
  controllers: [PurchasesController],
  providers: [PurchasesService, UsersService],
})
export class PurchasesModule {}
