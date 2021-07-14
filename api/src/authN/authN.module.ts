import { Global, Module } from '@nestjs/common';
import { AuthNService } from './authN.service';
import { AuthNController } from './authN.controller';
import { AuthNSanitizer } from './interceptor';
import { MailerModule } from '../mailer';
import { AuthZModule } from '../authZ';
import { APP_GUARD } from '@nestjs/core';
import { AuthNGuard } from './guards';

@Module({
  imports: [MailerModule, AuthZModule],
  providers: [
    AuthNService,
    AuthNSanitizer,
    {
      provide: APP_GUARD,
      useClass: AuthNGuard,
    },
  ],
  controllers: [AuthNController],
  exports: [AuthNService],
})
export class AuthNModule {}
