import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../../util';
import { AuthorizationDTO } from '../dto';
import { IAuthorization } from '../interface'
import { AddressSanitizer } from '../../../address';

@Injectable()
export class AuthorizationSanitizer implements ISanitize {
    constructor(
          private readonly addressSanitizer: AddressSanitizer
    ) { }

    sanitize(authorization: IAuthorization): AuthorizationDTO {
        const authorizationDTO: AuthorizationDTO = {
            id: authorization.id,
            clientId: authorization.clientId,
            authId: authorization.authId,
            funderId: authorization.funderId,
            startDate: authorization.startDate,
            endDate: authorization.endDate,
            status: authorization.status,
            location: authorization.location

        };
        return authorizationDTO;
    }


    sanitizeMany(authorization: IAuthorization[]): AuthorizationDTO[] {
        const authorizationDTOs: AuthorizationDTO[] = [];
        for (let i = 0; i < authorization.length; i++) {
            authorizationDTOs.push(this.sanitize(authorization[i]));
        }
        return authorizationDTOs;
    }
}