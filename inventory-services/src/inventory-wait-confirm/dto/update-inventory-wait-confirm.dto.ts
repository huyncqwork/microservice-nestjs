import { IsNumber } from 'class-validator';

export class UpdateInventoryWaitConfirmDto {
  @IsNumber()
  product_id: number;
  @IsNumber()
  quantity: number;
}
