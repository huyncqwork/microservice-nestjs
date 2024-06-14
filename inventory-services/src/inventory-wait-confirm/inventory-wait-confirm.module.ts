import { Module } from '@nestjs/common';
import { InventoryWaitConfirmService } from './inventory-wait-confirm.service';
import { InventoryWaitConfirmController } from './inventory-wait-confirm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryWaitConfirm } from './entities/inventory-wait-confirm.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, InventoryWaitConfirm])],
  controllers: [InventoryWaitConfirmController],
  providers: [InventoryWaitConfirmService],
})
export class InventoryWaitConfirmModule {}
