import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IOverTime } from '../interface';
import { OvertimeDTO } from '../dto';
import { AddressSanitizer } from '../../address';

@Injectable()
export class OvertimeSanitizer implements ISanitize {
    constructor(private readonly addressSanitizer: AddressSanitizer) { }

    sanitize(overtime: IOverTime): OvertimeDTO {
        const overtimeDTO: OvertimeDTO = {
            id: overtime.id,
            name: overtime.name,
            type: overtime.type,
            multiplier: overtime.multiplier,
            threshold: overtime.threshold,
        };
        return overtimeDTO;
    }


    sanitizeMany(overtime: IOverTime[]): OvertimeDTO[] {
        const overtimeDTOs: OvertimeDTO[] = [];
        for (let i = 0; i < overtime.length; i++) {
            overtimeDTOs.push(this.sanitize(overtime[i]));
        }
        return overtimeDTOs;
    }
}
