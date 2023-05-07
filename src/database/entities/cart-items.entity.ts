import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Carts } from './carts.entity';
import { Products } from './products.entity';

@Entity({ name: 'cart_items' })
export class CartItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

	@ManyToOne(() => Carts, (carts) => carts.id)
  cartId: Carts;

  @OneToOne(() => Products, { eager: true })
  @JoinColumn()
  product: Products

	@Column({ type: 'integer' })
  count: number;
}