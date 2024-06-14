import * as moment from 'moment';
import { INVENTORY_STATUS } from 'src/enum/emun';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  inventory_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column({
    default: '',
  })
  created_at: string;

  @Column({
    default: '',
  })
  updated_at: string;

  @Column({
    default: 0,
  })
  status: INVENTORY_STATUS;
}
