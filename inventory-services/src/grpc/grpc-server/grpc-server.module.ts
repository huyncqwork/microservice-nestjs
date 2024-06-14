import { Module } from '@nestjs/common';
import { GrpcServerController } from './grpc-server.controller';
import { InventoryService } from 'src/inventory/inventory.service';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  controllers: [GrpcServerController],
  providers: [InventoryService],
})
export class GrpcServerModule {}
