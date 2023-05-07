import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../../database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) { }

  async listAllProduct(): Promise<any[]> {
    const resp = await this.productRepository.find();
    return resp.map((product) => {
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        count: product.stocks.count
      }
    });
  }

  listAllProduct2(): Promise<Products[]> {
    return this.productRepository.find();
  }
}
