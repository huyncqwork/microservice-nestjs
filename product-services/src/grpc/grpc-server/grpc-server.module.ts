import { Module } from '@nestjs/common';
import { GrpcServerController } from './grpc-server.controller';

@Module({
    controllers: [GrpcServerController]
})
export class GrpcServerModule {}
