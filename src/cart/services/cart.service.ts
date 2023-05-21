import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carts, EStatus, CartItems, Products } from '../../database/entities/';

import { CartItem } from '../models';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private cartsRepository: Repository<Carts>,
    @InjectRepository(CartItems)
    private cartsItemsRepository: Repository<CartItems>,
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) { }

  findByUserId(userId: string): Promise<Carts> {
    return this.cartsRepository.findOne({
      where: {
        userId: userId,
        status: EStatus.OPEN
      },
      relations: ['items']
    });
  }

  createByUserId(userId: string): Promise<Carts> {
    const cart = new Carts();
    cart.userId = userId;
    cart.created_at = new Date();
    cart.updated_at = new Date();
    cart.status = EStatus.OPEN;

    return this.cartsRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string): Promise<Carts> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }


  async updateByUserId(userId: string, item: CartItem): Promise<CartItems> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);
    let cartItem = undefined;
    try {
      cartItem = await this.cartsItemsRepository.findOne({
        where: { cart_id: id, product: item.product.id},
      });
    } catch (error) {
      cartItem = undefined
    }

    if (cartItem) {
      if (item.count > 0) {
        cartItem.count = item.count;
        await this.cartsItemsRepository.save(cartItem);
      } else {
        await this.cartsItemsRepository.remove(cartItem);
      }
    } else {
      const product = await this.productRepository.findOne({
        where: {
          id: item.product.id
        }
      });
      cartItem = new CartItems();
      cartItem.cart_id = id as unknown as Carts;
      cartItem.product = product;
      cartItem.count = item.count;

      await this.cartsItemsRepository.save(cartItem);
    }
    return cartItem;
  }

  async removeByUserId(userId: string): Promise<void> {
    const cart = await this.cartsRepository.findOne({
      where: {
        userId: userId,
      },
      relations: ['items']
    });
    await this.cartsItemsRepository.delete({ cart });
    await this.cartsRepository.remove(cart);
    console.log('Cart was deleted ', cart)
  }

  async changeStatusByCartId(cartId: string, status: EStatus): Promise<void> {
    const cart = await this.cartsRepository.findOne({
      where: {
        id: cartId,
      },
      relations: ['items']
    });
    console.log('Cart', cart);
    cart.status = status;
    await this.cartsRepository.save(cart);
    console.log('Cart status was updated ', cart)
  }

}
