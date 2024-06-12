import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    images: string;
    @Column()
    name_product: string;
    @Column()
    price: number;
    @Column()
    description: string;
    @Column()
    status: boolean;
}