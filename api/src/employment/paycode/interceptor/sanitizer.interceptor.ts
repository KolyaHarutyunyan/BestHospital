import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../../util';
import { PayCodeDTO } from '../dto';
import { IPayCode } from '../interface';

@Injectable()
export class PayCodeSanitizer implements ISanitize {
    constructor() { }

    sanitize(payCode: IPayCode): PayCodeDTO {
        const payCodeDTO: PayCodeDTO = {
            id: payCode.id,
            name: payCode.name,
            employmentId: payCode.employmentId,
            payCodeTypeId: payCode.payCodeTypeId,
            rate: payCode.rate,
            active: payCode.active,
            startDate: payCode.startDate,
            endDate: payCode.endDate,
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
