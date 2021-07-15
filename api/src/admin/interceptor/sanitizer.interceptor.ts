import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IAdmin } from '..';
import { AdminDTO } from '../dto';
import { AddressSanitizer } from '../../address';

@Injectable()
export class AdminSanitizer implements ISanitize {
  constructor(private readonly addressSanitizer: AddressSanitizer) {}

  sanitize(user: IAdmin): AdminDTO {
    const userDTO: AdminDTO = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      ssn: user.ssn,
      dl: user.dl,
      address: this.addressSanitizer.sanitize(user.address),
    };
    return userDTO;
  }

  sanitizeMany(admins: IAdmin[]): AdminDTO[] {
    const adminDTOs: AdminDTO[] = [];
    for (let i = 0; i < admins.length; i++) {
      adminDTOs.push(this.sanitize(admins[i]));
    }
    return adminDTOs;
  }
}
