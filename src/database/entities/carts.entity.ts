import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CartItems } from './cart-items.entity';
import { Orders } from './orders.entity';
import { Users } from './users.entity'

export enum EStatus {
  OPEN = 'OPEN', 
	ORDERED = 'ORDERED'
}

@Entity({ name: 'carts' })
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Users)
  @JoinColumn()
  userId: Users

  @Column({ type: 'date', nullable: false })
  created_at: string;

  @Column({ type: 'date', nullable: false })
  updated_at: string;

	@Column()
  status: EStatus;

  @OneToMany(() => CartItems, (cartItems) =>cartItems.cartId)
  items: CartItems[]

  @OneToMany(() => Orders, (orders) =>orders.cartId)
  orders: Orders[]
}