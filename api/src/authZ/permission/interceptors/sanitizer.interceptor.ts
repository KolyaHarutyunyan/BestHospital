import { Injectable } from '@nestjs/common';
import { IPermission } from '../interface';
import { PermissionDTO } from '../dto';
import { ISanitize } from 'src/util';

@Injectable()
export class PermissionSanitizer implements ISanitize {
  /** Sanitize a single permission */
  sanitize(permission: IPermission): PermissionDTO {
    return {
      id: permission._id,
      title: permission.title,
      description: permission.description,
    };
  }
  /** Sanitizes an array of permissions and returns the new array containing the sanitized versions */
  sanitizeMany(permissions: IPermission[]): PermissionDTO[] {
    const sanitizedPermissions: PermissionDTO[] = [];
    for (let i = 0; i < permissions.length; i++) {
      sanitizedPermissions.push(this.sanitize(permissions[i]));
    }
    return sanitizedPermissions;
  }
}
/** End of Class */
