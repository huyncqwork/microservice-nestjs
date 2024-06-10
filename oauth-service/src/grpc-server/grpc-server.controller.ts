import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import {
  DataBaseResponse,
  HelloRequest,
  HelloResponse,
  HelloServiceController,
  HelloServiceControllerMethods,
  LoginRequest,
  SendRequest,
  StatusResponse,
} from './protos/interfaces/src/grpc-service/protos/oauth';
import { Public } from 'src/auth/auth.public';
import { JwtService } from '@nestjs/jwt';

@Controller()
@HelloServiceControllerMethods()
export class GrpcController implements HelloServiceController {
  constructor(    private jwtService: JwtService,
  ) {}
  async getToken(
    request: LoginRequest,
    metadata?: Metadata,
  ): Promise<DataBaseResponse> {
    return { status: 200, message: 'gof cixmadasdasd', data: null };
  }
  async sayHello(
    request: HelloRequest,
    metadata?: Metadata,
  ): Promise<HelloResponse> {
    return { message: 'asdasdasd' };
  }

  @Public()
  async checkToken(
    request: SendRequest,
    metadata?: Metadata,
  ): Promise<StatusResponse> {
    console.log(request);
    const payload = await this.jwtService.verifyAsync(request.token, {
      secret: process.env.SECRET,
    });
    console.log("🚀 ~ GrpcController ~ payload:", payload)
    return payload;
  }
}
