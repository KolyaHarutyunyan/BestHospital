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
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      firstEmail: user.firstEmail,
      secondEmail: user.secondEmail,
      firstNumber: user.firstNumber,
      secondNumber: user.secondNumber,
      driveLicenze: user.driveLicenze,
      state: user.state,
      gender: user.gender,
      birthday: user.birthday,
      residency: user.residency,
      ssn: user.ssn,
      address: this.addressSanitizer.sanitize(user.address),
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
