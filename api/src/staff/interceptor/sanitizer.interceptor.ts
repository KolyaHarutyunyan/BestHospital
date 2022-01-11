import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IStaff } from '..';
import { StaffDTO } from '../dto';
import { AddressSanitizer } from '../../address';

@Injectable()
export class StaffSanitizer implements ISanitize {
  constructor(private readonly addressSanitizer: AddressSanitizer) {}

  sanitize(user: IStaff): StaffDTO {
    const userDTO: StaffDTO = {
      id: user.id,
      service: user.service,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      secondaryEmail: user.secondaryEmail,
      phone: user.phone,
      secondaryPhone: user.secondaryPhone,
      state: user.state,
      status: user.status,
      gender: user.gender,
      birthday: user.birthday,
      residency: user.residency,
      ssn: user.ssn,
      termination: user.termination,
      license: user.license,
      address: this.addressSanitizer.sanitize(user.address),
      clinical: user.clinical,
    };
    return userDTO;
  }

  sanitizeMany(admins: IStaff[]): StaffDTO[] {
    const adminDTOs: StaffDTO[] = [];
    for (let i = 0; i < admins.length; i++) {
      adminDTOs.push(this.sanitize(admins[i]));
    }
    return adminDTOs;
  }
}
