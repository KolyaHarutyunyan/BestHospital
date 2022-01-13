import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_REGISTER, REGISTRATION_TOKEN } from '../authN.constants';

@Injectable()
export class RegistrationGuard implements CanActivate {
  /** Interface methods */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.get(REGISTRATION_TOKEN);
      this.checkToken(token);
      const decoded: any = await this.decodeToken(token);
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
      throw new HttpException('reset-token header was not set', HttpStatus.UNAUTHORIZED);
    }
  }

  /** Checks for the tokens validity */
  private async decodeToken(token: string) {
    if (!token) {
      throw new HttpException(
        'An access token must be set to access this resource',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      // Verify token
      const decoded: any = await jwt.verify(token, JWT_SECRET_REGISTER);
      return decoded;
    } catch (err) {
      throw new HttpException(
        'Your session is expired, please login again or token is invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
