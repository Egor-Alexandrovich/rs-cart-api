import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { DatabaseModule } from '../database/database.module';
import { OrderController } from './order.controller';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [DatabaseModule, CartModule],
  controllers: [OrderController],
  providers: [ OrderService ],
  exports: [ OrderService ]
})
export class OrderModule {}
