import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_REGISTER, REGISTRATION_TOKEN } from '../authN.constants';
import { IToken } from '../interface';

@Injectable()
export class RegistrationGuard implements CanActivate {
  /** Interface methods */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.get(REGISTRATION_TOKEN);
      this.checkToken(token);
      const decoded: IToken = await jwt.verify(token, JWT_SECRET_REGISTER);
      request.body.userId = decoded.id;
      return true;
    } catch (err) {
      //unknown error
      throw err;
    }
  }

  /** Private Methods */
  private checkToken(token: string) {
    if (!token) {
      throw new HttpException(
        'reset-token header was not set',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
