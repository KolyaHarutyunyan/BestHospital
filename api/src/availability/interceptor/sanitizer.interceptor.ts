import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IAvailability } from '../interface';
import { AvailabilityDTO } from '../dto';
// import { AddressSanitizer } from '../../address';

@Injectable()
export class AvailabilitySanitizer implements ISanitize {
  sanitize(availability: IAvailability): AvailabilityDTO {
    const availabilityDTO: AvailabilityDTO = {
      monday: availability.monday,
      tuesday: availability.tuesday,
      wednesday: availability.wednesday,
      thursday: availability.thursday,
      friday: availability.friday,
      saturday: availability.saturday,
      sunday: availability.sunday,
    };
    return availabilityDTO;
  }

  sanitizeMany(availabilities: IAvailability[]): AvailabilityDTO[] {
    const availabilityDTOs: AvailabilityDTO[] = [];
    for (let i = 0; i < availabilities.length; i++) {
      availabilityDTOs.push(this.sanitize(availabilities[i]));
    }
    return availabilityDTOs;
  }
}
