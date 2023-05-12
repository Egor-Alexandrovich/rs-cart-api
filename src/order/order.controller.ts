import { Controller, Get, Put, Body, Req, Post, HttpStatus, Param } from '@nestjs/common';

import { OrderService } from './services';
import { OrderPayload } from './models';
import { AppRequest } from '../../src/shared';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) { }

  @Get()
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }

  @Get('/:id')
  async getOrderById(@Param('id') id: string) {
    return await this.orderService.findById(id);
  }

  @Put()
  async createOrder(@Req() req: AppRequest, @Body() body: OrderPayload) {
    console.log('Body', body);
    const userId = '088bef61-8b79-4c8c-be38-d045e59bb043'
    const order = await this.orderService.create(userId, body);

    if (!(order && order.id)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      return {
        statusCode,
        message: 'Cart is empty',
      }
    }

    return {
      statusCode: 200,
      message: 'Order was created',
      order
    }
  }
}