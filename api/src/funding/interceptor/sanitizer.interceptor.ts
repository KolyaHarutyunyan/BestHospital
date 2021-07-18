import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IFunder } from '..';
import { FundingDTO } from '../dto';
import { AddressSanitizer } from '../../address';

@Injectable()
export class FundingSanitizer implements ISanitize {
  constructor(private readonly addressSanitizer: AddressSanitizer) {}

  sanitize(funder: IFunder): FundingDTO {
    const funderDTO: FundingDTO = {
      id: funder.id,
      name: funder.name,
      type: funder.type,
      email: funder.email,
      phoneNumber: funder.phoneNumber,
      contact: funder.contact,
      website: funder.website,
      status: funder.status,
      address: this.addressSanitizer.sanitize(funder.address),
      comments: funder.comments,
      histories: funder.histories
    };
    return funderDTO;
  }


  sanitizeMany(funders: IFunder[]): FundingDTO[] {
    const funderDTOs: FundingDTO[] = [];
    for (let i = 0; i < funders.length; i++) {
        funderDTOs.push(this.sanitize(funders[i]));
    }
    return funderDTOs;
  }
}
