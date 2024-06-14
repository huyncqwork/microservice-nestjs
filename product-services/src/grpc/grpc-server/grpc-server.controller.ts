import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from 'src/product/product.service';
import {
  GrpcProductServiceClient,
  ProductRequest,
  ProductResponse,
} from './protos/interfaces/src/grpc/grpc-server/protos/product';

@Controller('grpc-server')
export class GrpcServerController implements GrpcProductServiceClient {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('GrpcProductService', 'GetProduct')
  async getProduct(
    request: ProductRequest,
    metadata?: Metadata,
  ): Promise<ProductResponse> {
    // const response = await this.productService.findByIdGrpc(request.id);
    return;
  }
}
