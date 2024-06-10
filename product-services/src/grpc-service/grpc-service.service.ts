import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { HelloServiceClient, LoginRequest, SendRequest } from './protos/interfaces/src/grpc-service/protos/oauth';

@Injectable()
export class GrpcService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'hello',
      protoPath: join(__dirname, './protos/oauth.proto'),
    },
  })

  // constructor(@Inject('HELLO_PACKAGE') private client: ClientGrpc) {}
  private readonly client: ClientGrpc;
  private productService:  HelloServiceClient;

  onModuleInit() {  
    this.productService = this.client.getService('HelloService');
  }

  async getToken(request: LoginRequest){
    const a = await firstValueFrom(this.productService.getToken({token: request.token}))
    console.log("🚀 ~ GrpcService ~ getToken ~ a:", a)
  }

  async checkToken(request: SendRequest) {
    const a = await lastValueFrom(this.productService.checkToken({token: request.token}))
  }

//   getHero(): Observable<string> {
//     return this.productService.findOne({ id: 1 });
//   }
}
