import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    inventory_id: number;

    @Column()
    product_id: number;

    @Column()
    quantity: number;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;
}