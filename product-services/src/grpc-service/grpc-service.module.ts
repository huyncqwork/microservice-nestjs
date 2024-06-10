import { Module } from '@nestjs/common';
import { GrpcService } from './grpc-service.service';


@Module({
  providers: [GrpcService],
  exports: [GrpcService]
})
export class GrpcServiceModule {}