import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stocks' })
export class Stocks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'integer' , nullable: false })
  count: number;
}