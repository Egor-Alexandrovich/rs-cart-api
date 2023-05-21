import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

	@Column()
  name: string;

	@Column()
  email: string;

	@Column()
  password: string;
}