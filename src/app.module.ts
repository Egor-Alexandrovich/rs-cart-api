import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    OrderModule,
    DatabaseModule,
    CartModule,
    ProductModule,
    UsersModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
