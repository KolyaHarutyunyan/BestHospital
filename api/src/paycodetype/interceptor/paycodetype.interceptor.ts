import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { PayCodeTypeDTO } from '../dto';
import { IPayCodeType } from '../interface';

@Injectable()
export class PayCodeTypeSanitizer implements ISanitize {
  sanitize(payCodeType: IPayCodeType): PayCodeTypeDTO {
    const payCodeTypeDTO: PayCodeTypeDTO = {
      id: payCodeType.id,
      name: payCodeType.name,
      code: payCodeType.code,
      type: payCodeType.type,
      overtime: payCodeType.overtime,
      pto: payCodeType.pto,
    };
    return payCodeTypeDTO;
  }

  sanitizeMany(payCodes: IPayCodeType[]): PayCodeTypeDTO[] {
    const payCodeTypeDTOs: PayCodeTypeDTO[] = [];
    for (let i = 0; i < payCodes.length; i++) {
      payCodeTypeDTOs.push(this.sanitize(payCodes[i]));
    }
    return payCodeTypeDTOs;
  }
}
