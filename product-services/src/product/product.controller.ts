import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { BaseResponse } from 'src/response/baseResponse';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  async getAll() {
    return await this.productService.getAll();
  }

  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const response = await this.productService.createProduct(createProductDto);
    return new BaseResponse(response, HttpStatus.CREATED, "Created successfully!");
  }

  @Put('update/:id')
  async updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    const response = await this.productService.updateProduct(id, updateProductDto);
    return new BaseResponse(response, HttpStatus.OK, "Updated successfully!")
  }

  @Get('detail/:id')
  async detailProduct(@Param('id') id: number) {
    const response = await this.productService.findById(id);
    return new BaseResponse(response, HttpStatus.OK, "OK");
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: number) {    
    const response = await this.productService.deleteProduct(id);
    return new BaseResponse(response, HttpStatus.OK, "Delete product successfully!");
  }
}
