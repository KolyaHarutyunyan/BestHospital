import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../../util';
import { IAuthService } from '../interface';
import { AuthServiceDTO } from '../dto';

@Injectable()
export class AuthServiceSanitizer implements ISanitize {
  sanitize(authService: IAuthService): AuthServiceDTO {
    const authServiceDTO: AuthServiceDTO = {
      id: authService.id,
      authorizationId: authService.authorizationId,
      serviceId: authService.serviceId,
      modifiers: authService.modifiers,
      total: authService.total,
      completed: authService.completed,
    };
    return authServiceDTO;
  }

  sanitizeMany(service: IAuthService[]): AuthServiceDTO[] {
    const serviceDTOs: AuthServiceDTO[] = [];
    for (let i = 0; i < service.length; i++) {
      serviceDTOs.push(this.sanitize(service[i]));
    }
    return serviceDTOs;
  }
}
