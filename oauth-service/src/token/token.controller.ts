import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Public } from 'src/auth/auth.public';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Public()
  @GrpcMethod('HelloService', 'SayHello')
  sayHello(data: any): { message: string } {
    console.log('🚀 ~ HelloController ~ sayHello ~ data:', data);

    return { message: 'Hello, World!' };
  }
}
