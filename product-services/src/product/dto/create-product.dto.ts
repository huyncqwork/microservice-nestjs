import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateProductDto {
    
    @IsOptional()
    images: string;
    
    @IsNotEmpty({message: "Is not empty"})
    name_product: string;
    
    @IsNumber()
    price: number;
    
    @IsNumber()
    quantity: number;
    
    description: string;
}