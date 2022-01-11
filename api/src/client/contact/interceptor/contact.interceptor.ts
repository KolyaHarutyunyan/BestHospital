import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../../util';
import { IContact } from '../interface';
import { ContactDTO } from '../dto';
import { AddressSanitizer } from '../../../address';

@Injectable()
export class ContactSanitizer implements ISanitize {
  constructor(private readonly addressSanitizer: AddressSanitizer) {}

  sanitize(contact: IContact): ContactDTO {
    const contactDTO: ContactDTO = {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      relationship: contact.relationship,
      phoneNumber: contact.phoneNumber,
      address: this.addressSanitizer.sanitize(contact.address),
    };
    return contactDTO;
  }

  sanitizeMany(contacts: IContact[]): ContactDTO[] {
    const contactDTOs: ContactDTO[] = [];
    for (let i = 0; i < contacts.length; i++) {
      contactDTOs.push(this.sanitize(contacts[i]));
    }
    return contactDTOs;
  }
}
