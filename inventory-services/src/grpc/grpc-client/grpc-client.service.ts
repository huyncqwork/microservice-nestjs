import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  GrpcClientProductService,
  ProductRequest,
  ProductResponse,
} from './grpc-client.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GrpcClientService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:4001',
      package: 'product',
      protoPath: join(__dirname, './protos/product.proto'),
    },
  })
  private readonly client: ClientGrpc;
  private grpcClientProductService: GrpcClientProductService;

  onModuleInit() {
    this.grpcClientProductService = this.client.getService(
      'GrpcProductService',
    );
  }

  async getProduct(request: ProductRequest): Promise<ProductResponse> {
    const response = await firstValueFrom(
      this.grpcClientProductService.GetProduct({id: request.id}),
    );
    return response;
  }
}
