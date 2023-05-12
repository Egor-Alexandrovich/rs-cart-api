import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { CartController } from './cart.controller';
import { CartService } from './services';


@Module({
  imports: [ DatabaseModule ],
  providers: [ CartService ],
  controllers: [ CartController ],
  exports: [CartService]
})
export class CartModule {}
