import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { ICredential } from '..';
import { CredentialDTO } from '../dto';

@Injectable()
export class CredentialSanitizer implements ISanitize {
  sanitize(credential: ICredential): CredentialDTO {
    const CommentDTO: CredentialDTO = {
      _id: credential.id,
      name: credential.name,
      type: credential.type,
    };
    return CommentDTO;
  }

  sanitizeMany(credentials: ICredential[]): CredentialDTO[] {
    const CredentialDTOs: CredentialDTO[] = [];
    for (let i = 0; i < credentials.length; i++) {
      CredentialDTOs.push(this.sanitize(credentials[i]));
    }
    return CredentialDTOs;
  }
}
