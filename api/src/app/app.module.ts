import { Module } from '@nestjs/common';
import { AdminModule } from '../admin';
import { AuthNModule } from 'src/authN';
import { AuthZModule } from 'src/authZ';
import { MailerModule } from '../mailer';
import { AppController } from './app.controller';
import { DatabaseConnection } from './app.database';
import { AppService } from './app.service';
import { AddressModule } from '../address';
@Module({
  imports: [AuthNModule, AuthZModule, AddressModule, AdminModule],
  controllers: [AppController],
  providers: [AppService, DatabaseConnection],
})
export class AppModule {}
