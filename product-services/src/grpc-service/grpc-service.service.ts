import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class GrpcService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'hello',
      protoPath: join(__dirname, './oauth.proto'),
    },
  })
  private productService: ProductService;

  constructor(@Inject('HELLO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productService = this.client.getService<ProductService>('HeroesService');
  }

//   getHero(): Observable<string> {
//     return this.productService.findOne({ id: 1 });
//   }
}
