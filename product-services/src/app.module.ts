import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { Auth1Module } from './auth1/auth1.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HELLO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5000',
          package: 'hello',
          protoPath: join(__dirname, './grpc-service/oauth.proto') ,
        },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60d' },
    }),
    ProductModule, 
    DatabaseModule, AuthModule, Auth1Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
