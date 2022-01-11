import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../../util';
import { IModify } from '../interface';
import { ModifyDTO } from '../dto';

@Injectable()
export class ModifySanitizer implements ISanitize {
  constructor() {}

  sanitize(modifier: IModify): ModifyDTO {
    const modifierDTO: ModifyDTO = {
      _id: modifier._id,
      credentialId: modifier.credentialId,
      chargeRate: modifier.chargeRate,
      name: modifier.name,
      type: modifier.type,
      status: modifier.status,
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
