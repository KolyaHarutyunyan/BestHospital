import { Controller, Get } from '@nestjs/common';
import { Public } from '../util/decorators';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
  @Get()
  @Public()
  async sendTestMail() {
    const res = await this.mailerService.sendTestMail();
    return res;
  }
}
