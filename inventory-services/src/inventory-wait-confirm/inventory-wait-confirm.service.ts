import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInventoryWaitConfirmDto } from './dto/create-inventory-wait-confirm.dto';
import { UpdateInventoryWaitConfirmDto } from './dto/update-inventory-wait-confirm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryWaitConfirm } from './entities/inventory-wait-confirm.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Injectable()
export class InventoryWaitConfirmService {
  constructor(
    @InjectRepository(InventoryWaitConfirm)
    private inventoryWaitConfirmRepository: Repository<InventoryWaitConfirm>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createInventoryWaitConfirmDto: CreateInventoryWaitConfirmDto) {
    const { product_id, quantity } = createInventoryWaitConfirmDto;

    const inventoryWaitConfirm = await this.inventoryWaitConfirmRepository.save(
      this.inventoryWaitConfirmRepository.create({
        product_id,
        quantity,
        created_at: moment().format('DD/MM/YYYY HH:mm'),
      }),
    );

    return inventoryWaitConfirm;
  }

  async findAll() {
    return await this.inventoryWaitConfirmRepository.find();
  }

  async findOne(id: number) {
    await this.checkExists(id);

    return this.inventoryWaitConfirmRepository.findOne({ where: { inventory_wait_id: id } });
  }

  async update(id: number, updateInventoryWaitConfirmDto: UpdateInventoryWaitConfirmDto) {
    const { product_id, quantity } = updateInventoryWaitConfirmDto;

    await this.checkExists(id);

    await this.inventoryWaitConfirmRepository.update(
      {
        inventory_wait_id: id,
      },
      {
        product_id,
        quantity,
        updated_at: moment().format('DD/MM/YYYY HH:mm'),
      },
    );
    return await this.inventoryWaitConfirmRepository.findOne({ where: { inventory_wait_id: id } });
  }

  async remove(id: number) {
    await this.checkExists(id);
    return this.inventoryWaitConfirmRepository.delete(id);
  }

  async check(id: number) {
    const inventoryWaitConfirmExists = await this.inventoryWaitConfirmRepository.findOne({ where: { inventory_wait_id: id } });
    if (!inventoryWaitConfirmExists) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const inventory = await this.inventoryRepository.findOne({ where: { product_id: inventoryWaitConfirmExists.product_id } });

    if (!inventory) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    inventory.quantity += inventoryWaitConfirmExists.quantity;

    await this.inventoryRepository.save(inventory);
    await this.inventoryWaitConfirmRepository.delete(id);

    return inventory;
  }

  async cancel(id: number) {
    const inventoryWaitConfirmExists = await this.inventoryWaitConfirmRepository.findOne({ where: { inventory_wait_id: id } });
    if (!inventoryWaitConfirmExists) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    this.inventoryWaitConfirmRepository.delete(id);
  }

  async checkExists(id: number) {
    const inventoryWaitConfirmExists = await this.inventoryWaitConfirmRepository.findOne({ where: { inventory_wait_id: id } });
    if (!inventoryWaitConfirmExists) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
