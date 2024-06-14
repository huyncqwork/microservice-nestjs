import { Module } from '@nestjs/common';
import { GrpcServerController } from './grpc-server.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Products } from 'src/product/entity/products.entity';

@Module({
    controllers: [GrpcServerController],
    imports: [TypeOrmModule.forFeature([Products])],
    providers: [ProductService]
})
export class GrpcServerModule {}
 