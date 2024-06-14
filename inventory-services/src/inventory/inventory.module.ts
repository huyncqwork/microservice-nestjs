import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { GrpcClientModule } from 'src/grpc/grpc-client/grpc-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory]),
    GrpcClientModule
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
