import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { Request } from 'express';
import { GrpcService } from 'src/grpc-service/grpc-service.service';
import { Client, Transport, ClientGrpc } from '@nestjs/microservices';
import { join } from 'path';
import { HelloServiceClient, LoginRequest, SendRequest } from './oauth';

@Injectable()
export class AuthGuard implements CanActivate {


  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'hello',
      protoPath: join(__dirname, './oauth.proto'),
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

  async checkToken(request: SendRequest): Promise<any> {
    const a = await lastValueFrom(this.productService.checkToken({token: request.token}))
    return a;
  }


  // constructor(private grpcService: GrpcService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (token === undefined) {
      throw new HttpException("Token undefined", HttpStatus.UNAUTHORIZED);
    }
    const user = await this.checkToken({token: token})
    if(!user) {
      return false;
    }
    request['user'] = user
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
