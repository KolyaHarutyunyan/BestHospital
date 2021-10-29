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
      mimetype: file.mimetype,
      size: file.size,
      url: file.url,
      name: file.name,
      resource: file.resource,
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
