import { Controller, Get, Delete, Put, Body, Req, HttpStatus } from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
// import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';
import { CartItem } from './models';
import { EStatus } from '../database/entities';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
  ) { }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest): Promise<CartItem[]> {
    const userId = '088bef61-8b79-4c8c-be38-d045e59bb043'
    const cart = await this.cartService.findOrCreateByUserId(userId);
    return cart.items || []
  }

  @Get('update')
  async findUserCart2(): Promise<void> {
    const userId = '088bef61-8b79-4c8c-be38-d045e59bb043'
    const { id } = await this.cartService.findOrCreateByUserId(userId);
    console.log('ID', id)
    await this.cartService.changeStatusByCartId(id, EStatus.ORDERED);
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) {
    const userId = '088bef61-8b79-4c8c-be38-d045e59bb043'
    const cartItem = await this.cartService.updateByUserId(userId, body)

    return [cartItem]
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete()
  clearUserCart(@Req() req: AppRequest) {
    this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    }
  }
}
