import { IsNumber } from 'class-validator';

export class UpdateInventoryExportDto {
  @IsNumber()
  product_id: number;
  @IsNumber()
  quantity: number;
}
