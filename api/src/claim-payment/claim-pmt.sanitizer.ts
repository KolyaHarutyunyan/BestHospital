import { Injectable } from '@nestjs/common';
import { ISanitize } from '../util';
import { ClaimPmtDto } from './dto';
import { IClaimPmt } from './interface';

@Injectable()
export class ClaimPmtSanitizer implements ISanitize {
  sanitize(claimPmt: IClaimPmt): ClaimPmtDto {
    const claimPmtDTO: ClaimPmtDto = {
      _id: claimPmt._id,
      paymentAmount: claimPmt.paymentAmount,
      paymentType: claimPmt.paymentType,
      paymnetDate: claimPmt.paymnetDate,
      checkNumber: claimPmt.checkNumber,
      achNumber: claimPmt.achNumber,
      fundingSource: claimPmt.fundingSource,
      claimId: claimPmt.claimId,
      documents: claimPmt.documents,
    };
    return claimPmtDTO;
  }

  sanitizeMany(claimPmts: IClaimPmt[]): ClaimPmtDto[] {
    const claimPmtDTOs: ClaimPmtDto[] = [];
    for (let i = 0; i < claimPmts.length; i++) {
      claimPmtDTOs.push(this.sanitize(claimPmts[i]));
    }
    return claimPmtDTOs;
  }
}
