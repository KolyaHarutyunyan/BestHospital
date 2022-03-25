import { SESClient, SendEmailCommand, SendEmailRequest } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { DOMAIN_NAME } from '../constants';
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  MailStatus,
  SES_REGION,
} from './mailer.contants';
import { AuthTemplate } from './templates';

@Injectable()
export class MailerService {
  constructor(private readonly authTemplate: AuthTemplate) {
    this.mailer = new SESClient({
      region: SES_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
    // this.authTemplate = new AuthTemplate();
  }
  private mailer: SESClient;
  // private authTemplate: AuthTemplate;

  //TestMail
  sendTestMail = async () => {
    const mailOptions = this.authTemplate.generateTestEmail();
    return await this.sendMail(mailOptions);
  };

  /** Sends and email provided to it */
  sendForgetPasswordMail = async (mailData: any): Promise<MailStatus> => {
    const mailOptions = this.authTemplate.getForgetPasswordTemplate(mailData.token, mailData.email);
    return this.sendMail(mailOptions);
  };

  /** Sends email to invite a user for registration */
  sendInviteMail = async (email: string, token: string): Promise<MailStatus> => {
    const link = `${DOMAIN_NAME}register?token=${token}`;
    const mailOptions = this.authTemplate.getInviteTemplate(email, link);
    return this.sendMail(mailOptions);
  };

  //Private menthods
  private sendMail = async (options: SendEmailRequest): Promise<MailStatus> => {
    try {
      await this.mailer.send(new SendEmailCommand(options));
      return MailStatus.DELIVERED;
    } catch (err) {
      return MailStatus.NOT_DELIVERED;
    }
  };
}
