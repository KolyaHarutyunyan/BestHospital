import { Injectable } from '@nestjs/common';
import { SendEmailCommandInput } from '@aws-sdk/client-ses';
import { DOMAIN_NAME, COMPANY_EMAIL } from '../../constants';

@Injectable()
export class AuthTemplate {
  /** Generates an email template for forgetPassword */
  getForgetPasswordTemplate = (
    token: string,
    email: string,
  ): SendEmailCommandInput => {
    const url = `${DOMAIN_NAME}/resetPassword?resetToken=${token}`;
    const displayUrl = `${DOMAIN_NAME}/resetPassword`;
    const mailOptions: SendEmailCommandInput = {
      Destination: { ToAddresses: [email] },
      Source: COMPANY_EMAIL,
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test Email',
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `<html>
              <h1>Password Resetsubmitted for PoloTMS</h1>
              <br>
              <h3>Dear Customer</h3> <br>
              <p>
                  There has been a request to reset the password for the account 
                  associated with this email. If you have not authorized this update,
                  please reach out to us via email at ${COMPANY_EMAIL}. 
              </p>
              <p>
                  If you have requested a password reset, please click the link below to be redirected
                  to our website in order to create a new password. 
              </p>
              <br>
              <a href=${url}>${displayUrl}</a>
              <br>
              <p>
                  Thank you for being the best part of PoloTMS and have a great day!
              </p>
          </html> `,
          },
        },
      },
      ReplyToAddresses: ['eachbase@gmail.com'],
    };
    return mailOptions;
  };

  /** generate an email template for becoming a member */
  getInviteTemplate = (email: string, link): SendEmailCommandInput => {
    const mailOptions: SendEmailCommandInput = {
      Destination: { ToAddresses: [email] },
      Source: COMPANY_EMAIL,
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: 'PoloTMS Invitation',
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `<html>
              <h1>You have been invited to PoloTMS</h1>
              <br>
              <h3>Follow the following instructios to finish your registration</h3> <br>
              <p>
              </p>
              <p>
                  1. Click <a href=${link}>here</a> </br>
                  2. Create a password </br>
                  3. Sign-in to your account </br>
              </p>
          </html> `,
          },
        },
      },
      ReplyToAddresses: ['eachbase@gmail.com'],
    };
    return mailOptions;
  };

  /** For Testing only */
  generateTestEmail = (): SendEmailCommandInput => {
    const input: SendEmailCommandInput = {
      Destination: {
        ToAddresses: ['edgarc@eachbase.com'],
      },
      Source: 'eachbase@gmail.com',
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test Email',
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `<html>
                <h1>Testing PoloTMS</h1>
                
            </html> `,
          },
        },
      },
      ReplyToAddresses: ['eachbase@gmail.com'],
    };
    return input;
  };
}
