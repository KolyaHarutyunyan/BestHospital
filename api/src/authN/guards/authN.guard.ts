import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthNService } from '../authN.service';
import {
  JWT_SECRET_SIGNIN,
  ACCESS_TOKEN,
  RegistrationStatus,
} from '../authN.constants';
import { IAuth, IToken } from '../interface';
import { Reflector } from '@nestjs/core';

/** Authentication guard. Checks if the user has enough privilages to access a resource and whether the user is Authenticated */
@Injectable()
export class AuthNGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    // // this.authNService = new AuthNService();
  }

  // private reflector: Reflector
  private authNService: AuthNService;

  /** the guard interface main method */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    /** Check if the route is public */
    if (this.isPublic(context)) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token: string = request.get(ACCESS_TOKEN);
    //Decoded token
    const decoded: IToken = await this.decodeToken(token);
    //get user and auth
    const auth = await this.getAuth(decoded.id);
    this.checkSession(auth.session, token);
    request.body.userId = auth.id;
    request.auth = auth;
    request.token = token;
    return true;
  }

  /** Private Methods */
  /** Check if the public is set */
  private isPublic(context: ExecutionContext): boolean {
    return this.reflector.get<boolean>('isPublic', context.getHandler());
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
      const decoded: IToken = await jwt.verify(token, JWT_SECRET_SIGNIN);
      return decoded;
    } catch (err) {
      throw new HttpException(
        'Your session is expired, please login again',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  /** Check for user identity */
  private async getAuth(id: string): Promise<IAuth> {
    const auth = await this.authNService.findById(id);
    if (!auth) {
      throw new HttpException(
        "Failed to establish user's identity",
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (auth.status === RegistrationStatus.PENDING) {
      throw new HttpException(
        'Check your email to activate your account',
        HttpStatus.FORBIDDEN,
      );
    }
    return auth;
  }
  /** Checks if the token is current  */
  private async checkSession(storedToken: string, accessToken: string) {
    if (storedToken !== accessToken) {
      throw new HttpException(
        'This session is expired, please login again',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
