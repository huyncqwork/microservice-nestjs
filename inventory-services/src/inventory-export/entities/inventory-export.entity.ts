import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inventory-export')
export class InventoryExport {
  @PrimaryGeneratedColumn()
  inventory_wait_id: number;

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
}
