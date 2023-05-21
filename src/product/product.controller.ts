import { Controller, Get } from '@nestjs/common';

import { ProductService } from './services';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
  ) { }

  @Get()
  async getAllProduct() {
    return await this.productService.listAllProduct();
  }
}
