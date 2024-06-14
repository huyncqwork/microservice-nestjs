import { IsNumber } from 'class-validator';

export class CreateInventoryWaitConfirmDto {
  @IsNumber()
  product_id: number;
  @IsNumber()
  quantity: number;
}
