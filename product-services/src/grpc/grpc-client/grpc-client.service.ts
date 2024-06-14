import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  CreateInventoryRequest,
  EmptyDataResponse,
  GrpcInventoryClientService,
} from './grpc-client.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GrpcClientService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:5001',
      package: 'inventory_client',
      protoPath: join(__dirname, './protos/inventory-client.proto'),
    },
  })
  private readonly client: ClientGrpc;
  private grpcClientProductService: GrpcInventoryClientService;

  onModuleInit() {
    this.grpcClientProductService = this.client.getService(
      'GrpcInventoryClientService',
    );
  }

  async createInventory(
    request: CreateInventoryRequest,
  ): Promise<EmptyDataResponse> {

    const response = await firstValueFrom(
      this.grpcClientProductService.CreateInventory({ id: request.id }),
    );
    return response;
  }
}
