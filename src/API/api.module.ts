import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
    imports: [AuthModule, UsersModule, ProductsModule, PurchasesModule],
})
export class ApiModule {}
