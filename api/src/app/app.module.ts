import { Module } from '@nestjs/common';
import { AdminModule } from '../admin';
import { AuthNModule } from '../authN';
import { AuthZModule } from '../authZ';
import { MailerModule } from '../mailer';
import { AppController } from './app.controller';
import { DatabaseConnection } from './app.database';
import { AppService } from './app.service';
@Module({
  imports: [AuthNModule, AuthZModule],
  controllers: [AppController],
  providers: [AppService, DatabaseConnection],
})
export class AppModule {}
