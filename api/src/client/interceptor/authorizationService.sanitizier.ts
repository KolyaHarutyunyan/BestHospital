import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IAuthorizationService, IContact } from '../interface';
import { AuthorizationServiceDTO } from '../dto'
import { ContactDTO } from '../dto';
// import { AddressSanitizer } from '../../address';

@Injectable()
export class AuthorizationServiceSanitizer implements ISanitize {
    constructor(
        //   private readonly addressSanitizer: AddressSanitizer
    ) { }

    sanitize(authorizationService: IAuthorizationService): AuthorizationServiceDTO {
        const authorizationServiceDTO: AuthorizationServiceDTO = {
            id: authorizationService.id,
            clientId: authorizationService.clientId,
            service: authorizationService.service,
            modifiers: authorizationService.modifiers,
            total: authorizationService.total,
            completed: authorizationService.completed,
            available: authorizationService.available
        };
        return authorizationServiceDTO;
    }


    sanitizeMany(service: IAuthorizationService[]): AuthorizationServiceDTO[] {
        const serviceDTOs: AuthorizationServiceDTO[] = [];
        for (let i = 0; i < service.length; i++) {
            serviceDTOs.push(this.sanitize(service[i]));
        }
        return serviceDTOs;
    }
}
