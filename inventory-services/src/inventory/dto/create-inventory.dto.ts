import { IsNumber } from 'class-validator';

export class CreateInventoryDto {

  @IsNumber()
  product_id: number;

  @IsNumber()
  quantity: number;

}
