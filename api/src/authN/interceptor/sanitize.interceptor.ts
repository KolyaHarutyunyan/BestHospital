import { Injectable } from '@nestjs/common';
import { IAuth } from '../interface';

@Injectable()
export class Sanitizer {
  /** Public Methods */
  sanitizeAuth(auth: IAuth) {
    const sanitized = {
      email: auth.email,
    };
    return sanitized;
  }

  /* Private Methods */
  // private convertRole(role):
}
