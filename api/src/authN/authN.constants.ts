export const JWT_SECRET_SIGNIN = 'awdniawbdaowind9a999nianiwdnindiawdA(dwmaiwnd923a2@';
export const JWT_SECRET_FORGET_PASS = 'maodwhda92ena0dj9wjdn9aj2nekamdJDawdjAdawANDwAwd6^Ad8';
export const ACCESS_TOKEN = 'access-token';
export const RESET_TOKEN = 'reset-token';
export const REGISTRATION_TOKEN = 'registration-token';
export const JWT_SECRET_REGISTER = 'iawjiajwdia0w9udawjd9ajhaujj3ejq2jwjsaj3rjqe2';

export enum RegistrationStatus {
  PENDING = 1,
  ACTIVE = 2,
  INACTIVE = 3,
}

export const apiSummaries = {
  REGISTRATION: 'Used for completing registration.',
  RESEND_INVITE: 'Used to send another invite to the user.',
  FORGOT_PASSWORD:
    'When user forgets the password, they can send their email to this endpoint to receive email containing a temporary token',
};
