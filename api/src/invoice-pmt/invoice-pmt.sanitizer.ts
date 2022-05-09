import { Injectable } from '@nestjs/common';
import { ISanitize } from '../util';
import { InvPmtDto } from './dto';
import { IInvPmt } from './interface/invoice-pmt.interface';

@Injectable()
export class InvPmtSanitizer implements ISanitize {
  sanitize(posting: IInvPmt): InvPmtDto {
    const postingDTO: InvPmtDto = {
      _id: posting._id,
      paymentType: posting.paymentType,
      paymentReference: posting.paymentReference,
      paymentAmount: posting.paymentAmount,
      payer: posting.payer,
      invoice: posting.invoice,
      paymentDate: posting.paymentDate,
      transaction: posting.transaction,
      documents: posting.documents,
    };
    return postingDTO;
  }

  sanitizeMany(postings: IInvPmt[]): InvPmtDto[] {
    const postingDTOs: InvPmtDto[] = [];
    for (let i = 0; i < postings.length; i++) {
      postingDTOs.push(this.sanitize(postings[i]));
    }
    return postingDTOs;
  }
}
