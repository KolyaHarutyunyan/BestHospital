import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RoleService } from '../role';

export class AuthZGuard implements CanActivate {
  constructor(permissionCodes: number[]) {
    this.permissionCodes = permissionCodes;
    this.roleService = new RoleService();
  }
  private permissionCodes: number[];
  private roleService: RoleService;

  /** interface method */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = this.getAuth(request);
    const userPermissionCodes = await this.getPermissions(auth);
    /** Perform the checks */
    return this.checkPermissons(userPermissionCodes);
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
    return { ...request.auth };
  }

  /** Checks if there are roles attached to the user */
  private async getPermissions(auth): Promise<Set<number>> {
    if (!auth?.roles) {
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
    return false;
  }
}
