import { HttpStatus, Injectable } from '@nestjs/common';

import { Order, OrderPayload } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Carts, Orders, Users, EStatus } from '../../database/entities';
import { Repository } from 'typeorm';
import { CartService } from '../../cart';
import { calculateCartTotal } from '../../cart/models-rules';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
    private cartService: CartService
  ) { }
  private orders: Record<string, Order> = {}

  getAllOrders() {
    return this.orderRepository.find({
      relations: ['cart', 'cart.items']
    })
  }

  findById(orderId: string): Promise<Orders> {
    return this.orderRepository.findOne({
      where: {
        id: orderId,
      },
      relations: ['user','cart']
    });
  }

  async create(userId: string, body: OrderPayload): Promise<Orders | undefined> {
    const cart = await this.cartService.findByUserId(userId);
    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      return undefined
    }
    const order = new Orders();
    order.user = userId as unknown as Users;
    order.cart = cart.id as unknown as Carts;
    order.total = calculateCartTotal(cart);;
    order.status = EStatus.ORDERED;
    order.comments = body.address.comment;
    order.payment = JSON.stringify({
      type: 'Dummy payment type',
      firstName: body.address.firstName,
      lastName: body.address.lastName
    }, null, 2);
    order.delivery = JSON.stringify({
      type: 'Dummy delivery type',
      address: body.address.address,
    }, null, 2);

    await this.orderRepository.save(order);
    await this.cartService.changeStatusByCartId(cart.id, EStatus.ORDERED);

    return order
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[orderId] = {
      ...data,
      id: orderId,
    }
  }
}
