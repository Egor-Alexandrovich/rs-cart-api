import { Module } from '@nestjs/common';

import { ProductService } from './services';
import { DatabaseModule } from '../database/database.module';
import { ProductController } from './product.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule { }
