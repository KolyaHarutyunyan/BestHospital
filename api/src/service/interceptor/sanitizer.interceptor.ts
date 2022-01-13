import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IService } from '../interface';
import { ServiceDTO } from '../dto';

@Injectable()
export class ServiceSanitizer implements ISanitize {
  sanitize(service: IService): ServiceDTO {
    const serviceDTO: ServiceDTO = {
      id: service._id,
      name: service.name,
      displayCode: service.displayCode,
      category: service.category,
    };
    return serviceDTO;
  }

  sanitizeMany(services: IService[]): ServiceDTO[] {
    const serviceDTOs: ServiceDTO[] = [];
    for (let i = 0; i < services.length; i++) {
      serviceDTOs.push(this.sanitize(services[i]));
    }
    return serviceDTOs;
  }
}
