import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  isActive: boolean;

  @Column({
    default: ''
  })
  code: string;
}
