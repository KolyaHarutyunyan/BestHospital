import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseConnection } from './app.database';
import { AppService } from './app.service';
import { AuthNModule } from '../authN';
import { AuthZModule } from '../authZ';

@Module({
  imports: [ 
    AuthNModule,
    AuthZModule,
    ],
  controllers: [AppController],
  providers: [AppService, DatabaseConnection],
})
export class AppModule {}
