import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CartItems } from './cart-items.entity';
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
	@Column({
		type: 'uuid',
		nullable: false
	})
	userId: string;

  @Column({ type: 'date', nullable: false })
  created_at: Date;

  @Column({ type: 'date', nullable: false })
  updated_at: Date;

	@Column()
  status: EStatus;

  @OneToOne(() => Users)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: Users

  @OneToMany(() => CartItems, (cartItem) => cartItem.cart, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
	items: CartItems[]
}