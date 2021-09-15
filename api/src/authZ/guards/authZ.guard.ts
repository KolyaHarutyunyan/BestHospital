import { CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { IRequest } from '../../util';

/**
 * Authorization Guard that checks if the following user has permissions to access a resource.
 * If the user is authorized,the guard will attach the permission codes to the request object as a set
 */
export class AuthZGuard implements CanActivate {
  constructor(neededPermissions: number[]) {
    this.neededPermissions = neededPermissions;
  }
  private neededPermissions: number[];

  /** interface method */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    const user = this.getUser(request);
    this.checkPermissons(user.permissions);
    return true;
  }

  /** Private methods */
  /** Checks if the user is authenticated */
  private getUser(request: IRequest) {
    if (!request.user) {
      throw new HttpException('User is not authenticated', HttpStatus.FORBIDDEN);
    }
    return request.user;
  }

  /** Checking if the user has the needed permission to access this resource */
  private checkPermissons(permissionSet: Set<number>): boolean {
    if (!this.neededPermissions || this.neededPermissions.length < 0) {
      return true;
    }
    if (permissionSet != undefined) {
      /** loop through the permissions in the guard to check if they are contained in the user permission set */
      for (let i = 0; i < this.neededPermissions.length; i++) {
        if (permissionSet.has(this.neededPermissions[i])) {
          return true;
        }
      }
    }
    throw new HttpException(
      'You do not have necessary permissions for this action',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
