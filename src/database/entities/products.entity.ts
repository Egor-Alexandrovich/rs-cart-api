import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stocks } from './stocks.entity';

@Entity({ name: 'products' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false })
  title: string;

  @Column()
  description: string;

	@Column({ type: 'integer' })
  price: number;

	@OneToOne(() => Stocks, { eager: true })
  @JoinColumn()
  stocks: Stocks
}