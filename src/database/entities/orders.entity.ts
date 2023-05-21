import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Carts, EStatus } from './carts.entity';
import { Users } from './users.entity';

@Entity({ name: 'orders' })
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

	@OneToOne(() => Users)
  @JoinColumn()
  user: Users

  @OneToOne(() => Carts)
  @JoinColumn()
  cart: Carts

  @Column({ type: 'json' })
  payment: string;

	@Column({ type: 'json' })
  delivery: string;

	@Column()
  comments: string;

	@Column()
  status: EStatus;

	@Column({ type: 'numeric' })
  total: number;

}
