import { IsNumber } from 'class-validator';

export class UpdateInventoryDto {
  product_id: number;

  @IsNumber()
  quantity: number;

  updated_at: string;

}
