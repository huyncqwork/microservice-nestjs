import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { GrpcClientService } from 'src/grpc/grpc-client/grpc-client.service';
import { BaseResponse } from 'src/response/baseResponse';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly grpcClientService: GrpcClientService,
  ) {}

  @Get('list')
  async getAll() {
    return await this.productService.getAll();
  }

  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const response = await this.productService.createProduct(createProductDto);
    if (!response) {
      return new BaseResponse(null, HttpStatus.BAD_REQUEST, 'Created error!');
    }

    const result = await this.grpcClientService.createInventory({
      id: response.product_id,
    });

    if (!result) {
      return new BaseResponse(null, HttpStatus.BAD_REQUEST, 'Created error!');
    }

    return new BaseResponse(
      response,
      HttpStatus.CREATED,
      'Created successfully!',
    );
  }

  // @Put('update/:id')
  // async updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
  //   const response = await this.productService.updateProduct(id, updateProductDto);
  //   return new BaseResponse(response, HttpStatus.OK, "Updated successfully!")
  // }

  @Get('detail/:id')
  async detailProduct(@Param('id') id: number) {
    const response = await this.productService.findById(id);
    return new BaseResponse(response, HttpStatus.OK, 'OK');
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: number) {
    const response = await this.productService.deleteProduct(id);
    return new BaseResponse(
      response,
      HttpStatus.OK,
      'Delete product successfully!',
    );
  }
}
