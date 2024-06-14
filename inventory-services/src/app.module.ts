import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { GrpcClientModule } from './grpc/grpc-client/grpc-client.module';
import { DatabaseModule } from './database/database.module';
import { GrpcServerModule } from './grpc/grpc-server/grpc-server.module';
import { InventoryWaitConfirmModule } from './inventory-wait-confirm/inventory-wait-confirm.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { InventoryExportModule } from './inventory-export/inventory-export.module';

@Module({
  imports: [InventoryModule, GrpcClientModule, DatabaseModule, GrpcServerModule, InventoryWaitConfirmModule, InventoryExportModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
