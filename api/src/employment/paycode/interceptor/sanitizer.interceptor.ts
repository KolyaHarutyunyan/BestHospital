import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../../util';
import { PayCodeDTO } from '../dto';
import { IPayCode } from '../interface';

@Injectable()
export class PayCodeSanitizer implements ISanitize {
  sanitize(payCode: IPayCode): PayCodeDTO {
    const payCodeDTO: PayCodeDTO = {
      id: payCode.id,
      employmentId: payCode.employmentId,
      payCodeTypeId: payCode.payCodeTypeId,
      rate: payCode.rate,
      startDate: payCode.startDate,
      terminationDate: payCode.terminationDate,
    };
    return payCodeDTO;
  }

  sanitizeMany(payCodes: IPayCode[]): PayCodeDTO[] {
    const payCodeDTOs: PayCodeDTO[] = [];
    for (let i = 0; i < payCodes.length; i++) {
      payCodeDTOs.push(this.sanitize(payCodes[i]));
    }
    return payCodeDTOs;
  }
}
