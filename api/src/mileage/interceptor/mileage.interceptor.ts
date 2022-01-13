import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IMileage } from '../interface/mileage.interface';
import { MileageDTO } from '../dto';

@Injectable()
export class MileageSanitizer implements ISanitize {
  sanitize(mileage: IMileage): MileageDTO {
    const mileageDTO: MileageDTO = {
      _id: mileage.id,
      compensation: mileage.compensation,
      startDate: mileage.startDate,
      endDate: mileage.endDate,
    };
    return mileageDTO;
  }

  sanitizeMany(mileages: IMileage[]): MileageDTO[] {
    const mileageDTOs: MileageDTO[] = [];
    for (let i = 0; i < mileages.length; i++) {
      mileageDTOs.push(this.sanitize(mileages[i]));
    }
    return mileageDTOs;
  }
}
