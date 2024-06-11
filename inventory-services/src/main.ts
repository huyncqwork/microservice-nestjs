import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { ExceptionResponseDetail } from './util/exception-filter';
import { HttpExceptionFilter } from './util/ExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
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
