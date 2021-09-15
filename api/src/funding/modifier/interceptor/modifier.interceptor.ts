import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../../util';
import { IModify } from '../interface';
import { ModifyDTO } from '../dto'

@Injectable()
export class ModifySanitizer implements ISanitize {
    constructor() { }

    sanitize(modifier: IModify): ModifyDTO {
        const modifierDTO: ModifyDTO = {
            id: modifier.id,
            serviceId: modifier.serviceId,
            credentialId: modifier.credentialId,
            chargeRate: modifier.chargeRate,
            name: modifier.name,
            type: modifier.type
        };
        return modifierDTO;
    }

    sanitizeMany(modifiers: IModify[]): ModifyDTO[] {
        const modifyDTOs: ModifyDTO[] = [];
        for (let i = 0; i < modifiers.length; i++) {
            modifyDTOs.push(this.sanitize(modifiers[i]));
        }
        return modifyDTOs;
    }
}
