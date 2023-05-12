import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Carts } from './carts.entity';
import { Products } from './products.entity';
import { Orders } from './orders.entity';

@Entity({ name: 'cart_items' })
export class CartItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Products, { eager: true })
  @JoinColumn()
  product: Products;

  @Column({ type: 'uuid', nullable: false })
	cart_id: string;

	@ManyToOne(() => Carts, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'cart_id' })
	cart: Carts;

	@Column({ type: 'integer' })
  count: number;
}