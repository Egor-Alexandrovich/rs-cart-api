import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Carts } from './carts.entity';
import { Products } from './products.entity';

@Entity({ name: 'cart_items' })
export class CartItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Products, { eager: true })
  @JoinColumn()
  product: Products

	@ManyToOne(() => Carts, (carts) => carts.items, { onDelete: 'CASCADE' })
  cart: Carts;

	@Column({ type: 'integer' })
  count: number;
}