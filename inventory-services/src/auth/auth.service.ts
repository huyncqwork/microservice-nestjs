import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HelloServiceClient, SendRequest } from './oauth';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'hello',
      protoPath: join(__dirname, './protos/oauth.proto'),
    },
  })
  private readonly client: ClientGrpc;
  private helloServiceClient: HelloServiceClient;

  onModuleInit() {
    this.helloServiceClient = this.client.getService('HelloService');
  }

  async checkToken(request: SendRequest) {
    await firstValueFrom(this.helloServiceClient.checkToken({ token: request.token }));
  }
}
