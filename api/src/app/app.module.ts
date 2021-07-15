import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseConnection } from './app.database';
import { AppService } from './app.service';
import { AuthNModule } from 'src/authN';
import { AuthZModule } from 'src/authZ';
import { AddressModule } from '../address';
import { AdminModule } from '../admin';

@Module({
  imports: [ 
    AuthNModule,
    AuthZModule,
    AddressModule,
    AdminModule
    ],
  controllers: [AppController],
  providers: [AppService, DatabaseConnection],
})
export class AppModule {}
