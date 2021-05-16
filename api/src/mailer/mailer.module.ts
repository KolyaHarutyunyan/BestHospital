import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { AuthTemplate } from './templates';

@Module({
  providers: [MailerService, AuthTemplate],
  controllers: [MailerController],
  exports: [MailerService],
})
export class MailerModule {}
