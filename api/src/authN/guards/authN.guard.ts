import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthNService } from '../authN.service';
import { JWT_SECRET_SIGNIN, ACCESS_TOKEN, RegistrationStatus } from '../authN.constants';
import { IAuth, IToken } from '../interface';
import { Reflector } from '@nestjs/core';
import { IRequest } from '../../util';
import { RoleService } from '../../authZ';
import { UserDTO } from '../dto';

/** Authentication guard. Checks if the user has enough privilages to access a resource and whether the user is Authenticated */
@Injectable()
export class AuthNGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authNService: AuthNService,
    private readonly roleService: RoleService,
  ) {}

  /** the guard interface main method */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    /** Check if the route is public */
    if (this.isPublic(context)) {
      return true;
    }
    const request: IRequest = context.switchToHttp().getRequest();
    const token: string = request.get(ACCESS_TOKEN);
    //Decoded token
    const decoded: IToken = await this.decodeToken(token);
    //get user and auth
    const auth = await this.authNService.getSession(decoded.id, token);
    const user: UserDTO = {
      id: auth._id,
      email: auth.email,
      permissions: await this.roleService.getUserPermissionSet(auth.roles),
      type: auth.userType,
      status: auth.status,
    };
    request.body.user = user;
    request.body.token = token;
    request.user = user;
    return true;
  }

  /** Private Methods */
  /** Check if the public is set */
  private isPublic(context: ExecutionContext): boolean {
    return this.reflector.get<boolean>('isPublic', context.getHandler());
    // return false;
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
      const decoded: any = await jwt.verify(token, JWT_SECRET_SIGNIN);
      return decoded;
    } catch (err) {
      throw new HttpException(
        'Your session is expired, please login again',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
