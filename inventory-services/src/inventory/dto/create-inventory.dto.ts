import { IsNumber } from 'class-validator';

export class CreateInventoryDto {
  product_id: number;

  @IsNumber()
  quantity: number;

  created_at: string;

}
