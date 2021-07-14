import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IRequest } from '../../util';
import { IAuth } from '../../authN';
import { RoleService } from '../role';

/**
 * Authorization Guard that checks if the following user has permissions to access a resource.
 * If the user is authorized,the guard will attach the permission codes to the request object as a set
 */
export class AuthZGuard implements CanActivate {
  constructor(permissionCodes: number[], private roleService?: RoleService) {
    this.permissionCodes = permissionCodes;
    // this.roleService = new RoleService();
  }
  private permissionCodes: number[];
  // private roleService: RoleService;

  /** interface method */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    const auth = this.getAuth(request);
    const userPermissionCodes = await this.getPermissions(auth);
    /** Perform the checks */
    this.checkPermissons(userPermissionCodes);
    request.permissionCodes = userPermissionCodes;
    return true;
  }

  /** Private methods */
  /** Checks if the user is authenticated */
  private getAuth(request) {
    if (!request.auth) {
      throw new HttpException(
        'User is not authenticated',
        HttpStatus.FORBIDDEN,
      );
    }
    return request.auth;
  }

  /** Checks if there are roles attached to the user */
  private async getPermissions(auth: IAuth): Promise<Set<number>> {
    if (!auth.roles) {
      throw new HttpException(
        'User does not have any roles',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const permissionCodes = await this.roleService.getUserPermissionSet(
      auth.roles,
    );
    return permissionCodes;
  }

  /** Checking if the user has the needed permission to access this resource */
  private checkPermissons(permissionSet: Set<number>): boolean {
    /** loop through the permissions in the guard to check if they are contained in the user permission set */
    for (let i = 0; i < this.permissionCodes.length; i++) {
      if (permissionSet.has(this.permissionCodes[i])) {
        return true;
      }
    }
    throw new HttpException(
      'You do not have necessary permissions for this action',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
