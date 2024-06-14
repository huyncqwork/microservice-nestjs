import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entity/products.entity';
import { GrpcClientModule } from 'src/grpc/grpc-client/grpc-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    GrpcClientModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
