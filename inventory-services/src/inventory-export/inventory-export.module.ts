import { Module } from '@nestjs/common';
import { InventoryExportService } from './inventory-export.service';
import { InventoryExportController } from './inventory-export.controller';
import { InventoryExport } from './entities/inventory-export.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, InventoryExport])],
  controllers: [InventoryExportController],
  providers: [InventoryExportService],
})
export class InventoryExportModule {}
