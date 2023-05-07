import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carts } from '../../database/entities/';

import { v4 } from 'uuid';

import { Cart } from '../models';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private cartsRepository: Repository<Carts>,
  ) {}
  private userCarts: Record<string, Cart> = {};

  getAllCarts() {
    return this.cartsRepository.find();
  }

  findByUserId(userId: string) {
    return this.cartsRepository.findOne({
      where: {
        userId,
      },
      relations: ['items']
    });
  }

  // async findByUserId2(userId: string): Promise<Cart> {
    // const { id, items} = await this.cartsRepository.findOne({
    //   where: {
    //     userId,
    //   },
    //   relations: ['items']
    // });
  //   const cartItems = 
  //   // const response: Cart = {
  //   //   id,
  //   //   items: items || []
  //   // }
  //   return {
  //     id,
  //     items: []
  //   }
  // }

  createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[ userId ] = userCart;

    return userCart;
  }

  findOrCreateByUserId(userId: string): Cart {
    const userCart = this.findByUserId(userId);

    // if (userCart) {
    //   return userCart;
    // }

    return this.createByUserId(userId);
  }

  updateByUserId(userId: string, { items }: Cart): Cart {
    const { id, ...rest } = this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [ ...items ],
    }

    this.userCarts[ userId ] = { ...updatedCart };

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[ userId ] = null;
  }

}
