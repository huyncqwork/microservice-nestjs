import { Module } from '@nestjs/common';
import { GrpcClientService } from './grpc-client.service';

@Module({
  providers: [GrpcClientService],
  exports: [GrpcClientService]
})
export class GrpcClientModule {}
