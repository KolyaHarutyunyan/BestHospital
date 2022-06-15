import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../../util';
import { AuthDTO } from '../dto';
import { IAuth } from '../interface';
import { AddressSanitizer } from '../../../address';

@Injectable()
export class AuthSanitizer implements ISanitize {
  constructor(private readonly addressSanitizer: AddressSanitizer) {}
  sanitize(auth: IAuth): AuthDTO {
    const authDTO: AuthDTO = {
      id: auth.id,
      clientId: auth.clientId,
      authId: auth.authId,
      funderId: auth.funderId,
      startDate: auth.startDate,
      endDate: auth.endDate,
      documents: auth.documents,
      location: auth.location,
    };
    return authDTO;
  }

  sanitizeMany(auth: IAuth[]): AuthDTO[] {
    const authDTOs: AuthDTO[] = [];
    for (let i = 0; i < auth.length; i++) {
      authDTOs.push(this.sanitize(auth[i]));
    }
    return authDTOs;
  }
}
