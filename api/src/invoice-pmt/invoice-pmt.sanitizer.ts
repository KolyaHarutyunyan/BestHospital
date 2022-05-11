import { Injectable } from '@nestjs/common';
import { ISanitize } from '../util';
import { InvPmtDto } from './dto';
import { IInvPmt } from './interface/invoice-pmt.interface';

@Injectable()
export class InvPmtSanitizer implements ISanitize {
  sanitize(invPmt: IInvPmt): InvPmtDto {
    const postingDTO: InvPmtDto = {
      _id: invPmt._id,
      paymentType: invPmt.paymentType,
      paymentRef: invPmt.paymentRef,
      paymentAmount: invPmt.paymentAmount,
      invoices: invPmt.invoices,
      paymentDate: invPmt.paymentDate,
      eob: invPmt.eob,
      client: invPmt.client,
      checkNumber: invPmt.checkNumber,
    };
    return postingDTO;
  }

  sanitizeMany(invPmts: IInvPmt[]): InvPmtDto[] {
    const invPmtDTOs: InvPmtDto[] = [];
    for (let i = 0; i < invPmts.length; i++) {
      invPmtDTOs.push(this.sanitize(invPmts[i]));
    }
    return invPmtDTOs;
  }
}
