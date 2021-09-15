import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthZService {
  /** Checks if a user has permissions or not:
   * @returns true if user permission is matched to a permission, or false if not
   */
  hasPermission(neededPermissions: number[], userPermissions: Set<number>): boolean {
    if (!neededPermissions || neededPermissions.length < 1) return false;
    const newSet = new Set(userPermissions);
    //Check for super Admin
    if (newSet.has(0)) {
      return true;
    }
    for (let i = 0; i < neededPermissions.length; i++) {
      if (newSet.has(neededPermissions[i])) {
        return true;
      }
    }
    return false;
  }

  /** if the user does not have necessary permissions, throws an unauthorized error */
  enforcePermissions(neededPermissions: number[], userPermissions: Set<number>) {
    if (!this.hasPermission(neededPermissions, userPermissions)) {
      throw new HttpException(
        'User doesnt have needed permissions to access this resource',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
