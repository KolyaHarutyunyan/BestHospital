import { Injectable } from '@nestjs/common';
import { IAdmin } from '..';
import { AdminDTO } from '../dto';
@Injectable()
export class Sanitizer {
  sanitizeAdmin(user: IAdmin): AdminDTO {
    const userDTO: AdminDTO = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    return userDTO;
  }

  sanitizeMany(admins: IAdmin[]): AdminDTO[] {
    const adminDTOs: AdminDTO[] = [];
    for (let i = 0; i < admins.length; i++) {
      adminDTOs.push(this.sanitizeAdmin(admins[i]));
    }
    return adminDTOs;
  }
}
