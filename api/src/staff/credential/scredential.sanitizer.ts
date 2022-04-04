import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { SCredentialDTO } from './dto';
import { ICredential } from './interface';

@Injectable()
export class SCredentialSanitizer implements ISanitize {
    sanitize(scredential: ICredential): SCredentialDTO {
        const SCredentialDTO: SCredentialDTO = {
            _id: scredential._id,
            staffId: scredential.staffId,
            credentialId: scredential.credentialId,
            expirationDate: scredential.expirationDate,
            receiveData: scredential.receiveData
        };
        return SCredentialDTO;
    }

    sanitizeMany(scredentials: ICredential[]): SCredentialDTO[] {
        const SCredentialDTOs: SCredentialDTO[] = [];
        for (let i = 0; i < scredentials.length; i++) {
            SCredentialDTOs.push(this.sanitize(scredentials[i]));
        }
        return SCredentialDTOs;
    }
}
