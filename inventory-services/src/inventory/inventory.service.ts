import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { INVENTORY_STATUS } from 'src/enum/emun';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async findAll() {
    const list_inventory = await this.inventoryRepository.find({
      where: { status: 1 },
    });

    if (!list_inventory) {
      throw new HttpException('Empty list inventory!', HttpStatus.NOT_FOUND);
    }

    return list_inventory;
  }

  async findWaitConfirm() {
    const list_inventory_wait_confirm = await this.inventoryRepository.find({
      where: { status: 0 },
    });

    if (!list_inventory_wait_confirm) {
      throw new HttpException('Empty list inventory!', HttpStatus.NOT_FOUND);
    }

    return list_inventory_wait_confirm;
  }

  async createInventoryGrpc(id: number) {
    const productExists = await this.inventoryRepository.exists({
      where: {
        product_id: id,
      },
    });

    if (productExists) {
      throw new HttpException('Product already exists!', HttpStatus.CONFLICT);
    }

    const inventory_created = await this.inventoryRepository.save(
      this.inventoryRepository.create({
        product_id: id,
        quantity: 0,
        created_at: moment().format(),
      }),
    );

    return inventory_created;
  }

  async createInventory(createInventoryDto: CreateInventoryDto) {

    const inventory = await this.inventoryRepository.findOne({where: {product_id: createInventoryDto.product_id}});

    if (!inventory) {
      throw new HttpException('Inventory entry not found', HttpStatus.NOT_FOUND);
    }

    inventory.quantity += createInventoryDto.quantity;
    inventory.status = INVENTORY_STATUS.INACTIVE;

    const created_inventory = await this.inventoryRepository.save(inventory);

    return created_inventory;
  }
}
