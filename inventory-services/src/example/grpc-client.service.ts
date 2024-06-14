import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { lastValueFrom } from 'rxjs';
import { CustomerAlolineProfileDTO, NestjsSyncAlolineService, UpdateAvatarUserDTO } from './grpc-client.interface';

@Injectable()
export class GrpcClientService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: `${process.env.CONFIG_GRPC_JAVA_NET_TECHRES_ALOLINE_API_HOST}:${process.env.CONFIG_GRPC_JAVA_NET_TECHRES_ALOLINE_API_PORT}`,
      package: 'vn.techres.microservice.grpc.java.net_techres_party_api.sync.aloline',
      protoPath: join(__dirname, './nestjs_sync_aloline.proto'),
      loader: {
        longs: String,
        keepCase: true,
        defaults: true,
      },
      channelOptions: {
        'grpc.default_deadline_ms': 2000,
        'grpc.initial_reconnect_backoff_ms': 2000,
        'grpc.service_config': JSON.stringify({
          methodConfig: [
            {
              name: [],
              timeout: { seconds: 10, nanos: 0 },
              retryPolicy: {
                maxAttempts: 5,
                initialBackoff: '0.1s',
                maxBackoff: '30s',
                backoffMultiplier: 3,
                retryableStatusCodes: ['UNAVAILABLE'],
              },
            },
          ],
        }),
      },
      keepalive: { keepaliveTimeoutMs: 2000 },
    },
  })
  private readonly client: ClientGrpc;

  private nestjsSyncAlolineService: NestjsSyncAlolineService;

  onModuleInit() {
    this.nestjsSyncAlolineService = this.client.getService<NestjsSyncAlolineService>('NestjsSyncAlolineService');
  }

  async syncUpdateUser(data: CustomerAlolineProfileDTO) {
    const response = await lastValueFrom(this.nestjsSyncAlolineService.syncUpdateUser(data));
    if (response.status != HttpStatus.OK)
      throw new HttpException(
        'Đồng bộ dữ liệu PROFILE qua JAVA không thành công! \n' + response.message,
        HttpStatus.BAD_REQUEST,
      );
  }

  async syncUpdateAvatarUser(data: UpdateAvatarUserDTO) {
    const response = await lastValueFrom(this.nestjsSyncAlolineService.syncUpdateAvatarUser(data));
    if (response.status != HttpStatus.OK)
      throw new HttpException(
        'Đồng bộ dữ liệu AVATAR qua JAVA không thành công! \n' + response.message,
        HttpStatus.BAD_REQUEST,
      );
  }
}
