import * as moment from 'moment';
import { PRODUCT_STATUS } from 'src/enum/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  product_id: number;
  @Column()
  name: string;
  @Column()
  images: string;
  @Column()
  price: number;
  @Column()
  category_id: number;
  @Column()
  sku: string;
  @Column()
  description: string;
  @Column({
    default: 1,
    // enum: [PRODUCT_STATUS],
  })
  status: PRODUCT_STATUS;

  @CreateDateColumn({
    default: moment().format(),
  })
  created_at: Date;
  @UpdateDateColumn({
    default: moment().format(),
  })
  updated_at: Date;
}
