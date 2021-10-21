import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { AddressSanitizer } from '../../address';
import { FileDTO } from '../dto';
import { IFile } from '../interface';

@Injectable()
export class FileSanitizer implements ISanitize {
  constructor() {}
  sanitize(file: IFile): FileDTO {
    const sanitizedOffice: FileDTO = {
      id: file.id,
      type: file.type,
      url: file.url,
      resource: file.resource,
      onModel: file.onModel,
    };
    return sanitizedOffice;
  }

  sanitizeMany(files: IFile[]): FileDTO[] {
    const sanitized: FileDTO[] = [];
    for (let i = 0; i < files.length; i++) {
      sanitized.push(this.sanitize(files[i]));
    }
    return sanitized;
  }
}
