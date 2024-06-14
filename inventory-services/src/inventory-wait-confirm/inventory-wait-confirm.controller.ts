import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { BaseResponse } from 'src/response/baseResponse';
import { CreateInventoryWaitConfirmDto } from './dto/create-inventory-wait-confirm.dto';
import { UpdateInventoryWaitConfirmDto } from './dto/update-inventory-wait-confirm.dto';
import { InventoryWaitConfirmService } from './inventory-wait-confirm.service';

@Controller('inventory-wait-confirm')
export class InventoryWaitConfirmController {
  constructor(private readonly inventoryWaitConfirmService: InventoryWaitConfirmService) {}

  @Post('/create')
  async create(@Body() createInventoryWaitConfirmDto: CreateInventoryWaitConfirmDto) {
    const response = await this.inventoryWaitConfirmService.create(createInventoryWaitConfirmDto);
    return new BaseResponse(response, HttpStatus.CREATED, 'OK');
  }

  @Get()
  async findAll() {
    const response = await this.inventoryWaitConfirmService.findAll();
    return new BaseResponse(response, HttpStatus.OK, 'OK');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.inventoryWaitConfirmService.findOne(+id);
    return new BaseResponse(response, HttpStatus.OK, 'OK');
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updateInventoryWaitConfirmDto: UpdateInventoryWaitConfirmDto) {
    const response = await this.inventoryWaitConfirmService.update(+id, updateInventoryWaitConfirmDto);
    return new BaseResponse(response, HttpStatus.OK, 'OK');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.inventoryWaitConfirmService.remove(+id);
    return new BaseResponse(null, HttpStatus.OK, 'OK');
  }

  @Post(':id/check')
  async check(@Param('id') id: string) {
    await this.inventoryWaitConfirmService.check(+id);
    return new BaseResponse(null, HttpStatus.OK, 'OK');
  }

  @Post(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.inventoryWaitConfirmService.cancel(+id);
    return new BaseResponse(null, HttpStatus.OK, 'OK');
  }
}
