import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { InventoryWaitConfirm } from 'src/inventory-wait-confirm/entities/inventory-wait-confirm.entity';
import { InventoryExport } from 'src/inventory-export/entities/inventory-export.entity';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'A_inventory_service',
      entities: [Inventory, InventoryWaitConfirm, InventoryExport],
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
