import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carts, EStatus, CartItems, Products } from '../../database/entities/';

import { v4 } from 'uuid';

import { Cart, CartItem } from '../models';

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
  private userCarts: Record<string, Cart> = {};

  getAllCarts() {
    return this.cartsRepository.find({
      relations: ['items']
    });
  }

  findByUserId(userId: string): Promise<Carts> {
    return this.cartsRepository.findOne({
      where: {
        userId: userId,
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
        where: { cart: id, product: item.product.id},
      });
    } catch (error) {
      cartItem = undefined
    }

    console.log('cartItem', cartItem)
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
      cartItem.cart = id as unknown as Carts;
      cartItem.product = product;
      cartItem.count = item.count;

      await this.cartsItemsRepository.save(cartItem);
    }
    return cartItem;
  }

  async removeByUserId(userId): Promise<void> {
    const cart = await this.cartsRepository.findOne({
      where: {
        userId: userId,
      },
      relations: ['items']
    });
    await this.cartsRepository.remove(cart);
  }

}
