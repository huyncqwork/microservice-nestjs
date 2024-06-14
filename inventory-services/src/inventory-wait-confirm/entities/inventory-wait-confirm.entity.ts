import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inventory-wait-confirm')
export class InventoryWaitConfirm {
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
