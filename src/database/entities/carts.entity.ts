import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'date', nullable: false })
  created_at: Date;

  @Column({ type: 'date', nullable: false })
  updated_at: Date;

	@Column()
  status: EStatus;

  @OneToMany(() => CartItems, (cartItems) =>cartItems.cart, { cascade: true })
  items: CartItems[]
}