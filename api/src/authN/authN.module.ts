import { Module } from '@nestjs/common';
import { AuthNService } from './authN.service';
import { AuthNController } from './authN.controller';
import { Sanitizer } from './interceptor';
import { MailerModule } from '../mailer';
import { AuthZModule } from '../authZ';

@Module({
  imports: [MailerModule, AuthZModule],
  providers: [AuthNService, Sanitizer],
  controllers: [AuthNController],
  exports: [AuthNService],
})
export class AuthNModule {}
