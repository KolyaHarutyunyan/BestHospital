import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IFunder } from '..';
import { FundingDTO, ServiceDTO } from '../dto';
import { AddressSanitizer } from '../../address';
import { IService } from '../interface';

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
      termination: funder.termination,
      address: this.addressSanitizer.sanitize(funder.address),
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

  serviceSanitize(service: IService): ServiceDTO {
    const serviceDTO: ServiceDTO = {
      id: service.id,
      funderId: service.funderId,
      serviceId: service.serviceId,
      modifiers: service.modifiers,
      rate: service.rate,
      cptCode: service.cptCode,
      size: service.size,
      min: service.min,
      max: service.max,
      chargeRate: service.chargeRate,
      credentialId: service.credentialId,
    };
    return serviceDTO;
  }
  serviceSanitizeMany(services: IService[]): ServiceDTO[] {
    const serviceDTOs: ServiceDTO[] = [];
    for (let i = 0; i < services.length; i++) {
      serviceDTOs.push(this.serviceSanitize(services[i]));
    }
    return serviceDTOs;
  }
}
