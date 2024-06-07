import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/product/entity/products';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'A_product_service',
      entities: [Products],
    })
  ]
})
export class DatabaseModule {}
