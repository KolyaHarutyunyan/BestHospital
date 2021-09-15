import { Injectable } from '@nestjs/common';
import { IRole } from '../interface';
import { RoleDTO } from '../dto';
import { ISanitize } from '../../../util';
import { IPermission, PermissionDTO, PermissionSanitizer } from '../../permission';

@Injectable()
export class RoleSanitizer implements ISanitize {
  constructor(private readonly permissionSanitizer: PermissionSanitizer) {}
  /** Sanitize a role */
  sanitize(role: IRole): RoleDTO {
    const sanitized: RoleDTO = {
      id: role._id,
      title: role.title,
      description: role.description,
      permissions: this.getPermissions(role.permissions),
      isDefault: role.isDefault,
    };
    return sanitized;
  }

  /** Sanitizes an array of roles and returns the new array containing the sanitized versions */
  sanitizeMany(roles: IRole[]): RoleDTO[] {
    const sanitizedRoles: RoleDTO[] = [];
    for (let i = 0; i < roles.length; i++) {
      sanitizedRoles.push(this.sanitize(roles[i]));
    }
    return sanitizedRoles;
  }

  private getPermissions(permissions: string[]): string[] | PermissionDTO[] {
    if (!permissions || permissions.length < 1) {
      return [];
    }
    const permission = (permissions[0] as unknown) as IPermission;
    if (permission.title) {
      //permission was populated
      return this.permissionSanitizer.sanitizeMany((permissions as unknown) as IPermission[]);
    } else {
      //not populated
      return permissions;
    }
  }
  //////TODO: Continue to populate
}
/** End of Class */
