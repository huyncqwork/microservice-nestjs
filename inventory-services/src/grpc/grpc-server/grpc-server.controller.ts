import { Controller } from '@nestjs/common';
import { InventoryService } from 'src/inventory/inventory.service';
import { CreateInventoryRequest } from './grpc-server.interface';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('grpc-server')
export class GrpcServerController {
  constructor(private readonly inventoryService: InventoryService) {}

  @GrpcMethod('GrpcInventoryClientService', 'CreateInventory')
  async createInventory( request: CreateInventoryRequest ) {    
    const response = await this.inventoryService.createInventoryGrpc(request.id)
    return response;
  }
}
