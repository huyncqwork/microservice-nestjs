import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { GrpcClientService } from 'src/grpc/grpc-client/grpc-client.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { BaseResponse } from 'src/response/baseResponse';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly grpcClientService: GrpcClientService,
  ) {}

  // @Get('/:id')
  // async getProduct(@Param('id') id: number) {
  //   const response = await this.grpcClientService.getProduct({id});
  //   return response;
  // }

  @Get('list')
  async listInventory() {
    const response = await this.inventoryService.findAll();
    return new BaseResponse(response, HttpStatus.OK, 'OK');
  }

  @Get('wait-confirm')
  async waitConfirm() {
    const response = await this.inventoryService.findWaitConfirm();
    return new BaseResponse(response, HttpStatus.OK, 'OK');
  }

  @Post('create')
  async createInventory(@Body() createInventoryDto: CreateInventoryDto) {
    const response = await this.inventoryService.createInventory(createInventoryDto);
    return new BaseResponse(response, HttpStatus.CREATED, 'Created successfully!');
  }
}
