import { Module } from '@nestjs/common';
import { GrpcController } from './grpc-server.controller';

@Module({
    controllers: [GrpcController]
})
export class GrpcServerModule {}
