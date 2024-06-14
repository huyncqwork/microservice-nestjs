import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  sku: string;

  @IsNotEmpty()
  name: string;

  images: string;

  @IsNumber()
  price: number;

  @IsNumber()
  category_id: number;

  description: string;
}