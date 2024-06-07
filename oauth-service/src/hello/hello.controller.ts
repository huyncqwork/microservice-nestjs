import { Controller } from '@nestjs/common';
import { HelloService } from './hello.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Public } from 'src/auth/auth.public';
 
@Controller()
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Public()
  @GrpcMethod('HelloService', 'SayHello')
  sayHello(data: any): { message: string } {
    console.log("🚀 ~ HelloController ~ sayHello ~ data:", data)
    
    return { message: 'Hello, World!' };
  }
}
