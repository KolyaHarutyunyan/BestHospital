import { Module } from '@nestjs/common';
import { MailerModule } from '../mailer';
import { AppController } from './app.controller';
import { DatabaseConnection } from './app.database';
import { AppService } from './app.service';
import { AuthNModule } from '../authN';
import { AuthZModule } from '../authZ';
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
