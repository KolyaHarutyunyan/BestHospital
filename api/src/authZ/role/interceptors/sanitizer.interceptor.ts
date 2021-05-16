import { Injectable } from '@nestjs/common';
import { IRole } from '../interface';
import { RoleDTO } from '../dto';

@Injectable()
export class Sanitizer {
  /** Sanitizes an array of roles and returns the new array containing the sanitized versions */
  sanitizeRoles(roles: IRole[]): RoleDTO[] {
    const sanitizedRoles: RoleDTO[] = [];
    for (let i = 0; i < roles.length; i++) {
      sanitizedRoles.push(this.sanitizeRole(roles[i]));
    }
    return sanitizedRoles;
  }

  /** Sanitize a role */
  sanitizeRole(role: IRole): RoleDTO {
    return {
      id: role._id,
      title: role.title,
      description: role.description,
      permissions: role.permissions,
      isDefault: role.isDefault,
    };
  }
}
/** End of Class */
