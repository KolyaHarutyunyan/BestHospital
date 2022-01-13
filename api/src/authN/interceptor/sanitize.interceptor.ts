import { Injectable } from '@nestjs/common';
import { IRole, RoleDTO, RoleSanitizer } from '../../authZ/role';
import { ISanitize } from '../../util';
import { AuthResponseDTO } from '../dto';
import { IAuth } from '../interface';

@Injectable()
export class AuthNSanitizer implements ISanitize {
  constructor(private readonly roleSanitizer: RoleSanitizer) {}
  /** Public Methods */
  sanitize(auth: IAuth): AuthResponseDTO {
    const sanitized = {
      email: auth.email,
      roles: this.getRoles(auth.roles),
    };
    return sanitized;
  }

  /* Private Methods */
  private getRoles(roles: any): string[] | RoleDTO[] {
    if (!roles || roles.length < 1) {
      return [];
    }
    const role = roles[0] as unknown as IRole;
    if (role.title) {
      //permission was populated
      return this.roleSanitizer.sanitizeMany(roles as unknown as IRole[]);
    } else {
      //not populated
      return roles;
    }
  }
}
