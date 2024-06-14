import { IsNumber } from 'class-validator';

export class CreateInventoryExportDto {
  @IsNumber()
  product_id: number;
  @IsNumber()
  quantity: number;
}
