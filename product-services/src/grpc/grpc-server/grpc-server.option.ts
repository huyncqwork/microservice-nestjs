import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const GrpcServerOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `0.0.0.0:4001`,
    package: 'product',
    protoPath: join(__dirname, './protos/product.proto'),
    loader: {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    },
    keepalive: {
      keepaliveTimeMs: 10000,
      keepaliveTimeoutMs: 5000,
      keepalivePermitWithoutCalls: 1,
    },
  },
};
