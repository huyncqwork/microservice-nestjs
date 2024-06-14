import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './util/exceptionFilter';
import { ExceptionResponseDetail } from './util/httpExceptionFilter';
import { MicroserviceOptions } from '@nestjs/microservices';
import { GrpcServerOptions } from './grpc/grpc-server/grpc-server.option';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.connectMicroservice<MicroserviceOptions>(GrpcServerOptions)
  await app.startAllMicroservices()

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []): void => {
        throw new HttpException(
          new ExceptionResponseDetail(
            HttpStatus.BAD_REQUEST,
            Object.values(validationErrors[0].constraints)[0]
          ),
          HttpStatus.OK
        );
      }
    })
  );

  await app.listen(3001);
}
bootstrap();
