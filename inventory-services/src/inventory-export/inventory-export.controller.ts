import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { InventoryExportService } from './inventory-export.service';
import { CreateInventoryExportDto } from './dto/create-inventory-export.dto';
import { UpdateInventoryExportDto } from './dto/update-inventory-export.dto';
import { BaseResponse } from 'src/response/baseResponse';

@Controller('inventory-export')
export class InventoryExportController {
  constructor(private readonly inventoryExportService: InventoryExportService) {}

  @Post('/create')
  async create(@Body() createInventoryExportDto: CreateInventoryExportDto) {
    const response = await this.inventoryExportService.create(createInventoryExportDto);
    return new BaseResponse(response, HttpStatus.CREATED, 'OK');
  }

  @Get()
  async findAll() {
    const response = await this.inventoryExportService.findAll();
    return new BaseResponse(response, HttpStatus.OK, 'OK');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.inventoryExportService.findOne(+id);
    return new BaseResponse(response, HttpStatus.OK, 'OK');
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updateInventoryExportDto: UpdateInventoryExportDto) {
    const response = await this.inventoryExportService.update(+id, updateInventoryExportDto);
    return new BaseResponse(response, HttpStatus.OK, 'OK');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.inventoryExportService.remove(+id);
    return new BaseResponse(response, HttpStatus.OK, 'OK');
  }

  @Post(':id/check')
  async check(@Param('id') id: string) {
    await this.inventoryExportService.check(+id);
    return new BaseResponse(null, HttpStatus.OK, 'OK');
  }

  @Post(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.inventoryExportService.cancel(+id);
    return new BaseResponse(null, HttpStatus.OK, 'OK');
  }
}
