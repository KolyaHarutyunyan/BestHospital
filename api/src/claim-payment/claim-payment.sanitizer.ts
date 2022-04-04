import { Injectable } from '@nestjs/common';
import { ISanitize } from '../util';
import { ClaimPaymentDto } from './dto';
import { IClaimPayment } from './interface';

@Injectable()
export class ClaimPaymentSanitizer implements ISanitize {
  sanitize(claimPayment: IClaimPayment): ClaimPaymentDto {
    const claimPaymentDTO: ClaimPaymentDto = {
      _id: claimPayment._id,
    };
    return claimPaymentDTO;
  }

  sanitizeMany(claimPayments: IClaimPayment[]): ClaimPaymentDto[] {
    const claimPaymentDTOs: ClaimPaymentDto[] = [];
    for (let i = 0; i < claimPayments.length; i++) {
      claimPaymentDTOs.push(this.sanitize(claimPayments[i]));
    }
    return claimPaymentDTOs;
  }
}
