import { Injectable } from '@nestjs/common';
import { IPermission } from '../interface';
import { PermissionDTO } from '../dto';

@Injectable()
export class Sanitizer {
  /** Sanitizes an array of permissions and returns the new array containing the sanitized versions */
  sanitizePermissions(permissions: IPermission[]): PermissionDTO[] {
    const sanitizedPermissions: PermissionDTO[] = [];
    for (let i = 0; i < permissions.length; i++) {
      sanitizedPermissions.push(this.sanitizePermission(permissions[i]));
    }
    return sanitizedPermissions;
  }

  /** Sanitize a single permission */
  sanitizePermission(permission: IPermission): PermissionDTO {
    return {
      id: permission._id,
      title: permission.title,
      description: permission.description,
    };
  }
}
/** End of Class */
