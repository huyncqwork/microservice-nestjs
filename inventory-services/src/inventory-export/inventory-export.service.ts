import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInventoryExportDto } from './dto/create-inventory-export.dto';
import { UpdateInventoryExportDto } from './dto/update-inventory-export.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryExport } from './entities/inventory-export.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Injectable()
export class InventoryExportService {
  constructor(
    @InjectRepository(InventoryExport) private inventoryExportRepository: Repository<InventoryExport>,
    @InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createInventoryExportDto: CreateInventoryExportDto) {
    const { product_id, quantity } = createInventoryExportDto;

    const createInventoryExport = await this.inventoryExportRepository.save(
      this.inventoryExportRepository.create({
        product_id,
        quantity,
        created_at: moment().format('DD/MM/YYYY HH:mm'),
      }),
    );
    return createInventoryExport;
  }

  findAll() {
    return this.inventoryExportRepository.find();
  }

  async findOne(id: number) {
    await this.checkExists(id);

    return this.inventoryExportRepository.findOne({ where: { inventory_wait_id: id } });
  }

  async update(id: number, updateInventoryExportDto: UpdateInventoryExportDto) {
    const { product_id, quantity } = updateInventoryExportDto;

    await this.checkExists(id);

    await this.inventoryExportRepository.update(
      {
        inventory_wait_id: id,
      },
      {
        product_id,
        quantity,
        updated_at: moment().format('DD/MM/YYYY HH:mm'),
      },
    );
    return await this.inventoryExportRepository.findOne({ where: { inventory_wait_id: id } });
  }

  async remove(id: number) {
    await this.checkExists(id);

    return this.inventoryExportRepository.delete(id);
  }

  async check(id: number) {
    const inventoryWaitConfirmExists = await this.inventoryExportRepository.findOne({ where: { inventory_wait_id: id } });
    if (!inventoryWaitConfirmExists) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const inventory = await this.inventoryRepository.findOne({ where: { product_id: inventoryWaitConfirmExists.product_id } });

    if (!inventory) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    inventory.quantity -= inventoryWaitConfirmExists.quantity;

    await this.inventoryRepository.save(inventory);
    await this.inventoryExportRepository.delete(id);

    return inventory;
  }

  async cancel(id: number) {
    const inventoryWaitConfirmExists = await this.inventoryExportRepository.findOne({ where: { inventory_wait_id: id } });
    if (!inventoryWaitConfirmExists) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    this.inventoryExportRepository.delete(id);
  }

  async checkExists(id: number) {
    const inventoryExport = await this.inventoryExportRepository.exists({ where: { inventory_wait_id: id } });

    if (!inventoryExport) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
