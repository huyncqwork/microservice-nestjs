import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { GrpcServerOptions } from './grpc-server/grpc-server.option';
import { HttpExceptionFilter } from './util/ExceptionFilter';
import { ExceptionResponseDetail } from './util/exception-filter';


dotenv.config();

async function bootstrap() {
  // const app = await NestFactory.createMicroservice(AppModule, );
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  }));
  
    app.connectMicroservice<MicroserviceOptions>(GrpcServerOptions)
  await app.startAllMicroservices()

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []): void => {
        throw new HttpException(
          new ExceptionResponseDetail(
            HttpStatus.BAD_REQUEST,
            Object.values(validationErrors[0].constraints)[0],
          ),
          HttpStatus.OK,
        );
      },
    }),
  );

await app.listen(3000);
}
bootstrap();
