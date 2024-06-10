import { Module } from '@nestjs/common';
import { GrpcService } from 'src/grpc-service/grpc-service.service';

@Module({
  providers: [GrpcService],
  imports: [],
  exports: [],
})
export class AuthModule {}
