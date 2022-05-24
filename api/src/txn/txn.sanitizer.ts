import { Injectable } from '@nestjs/common';
import { ISanitize } from '../util';
import { TxnDto } from './dto';
import { ITxn } from './interface';

@Injectable()
export class TxnSanitizer implements ISanitize {
  sanitize(txn: ITxn): TxnDto {
    const txnDTO: TxnDto = {
      _id: txn._id,
      billing: txn.billing,
      type: txn.type,
      rate: txn.rate,
      date: txn.date,
      status: txn.status,
      paymentRef: txn.paymentRef,
      note: txn.note,
      creator: txn.creator,
    };
    return txnDTO;
  }

  sanitizeMany(invPmts: ITxn[]): TxnDto[] {
    const txnDTOs: TxnDto[] = [];
    for (let i = 0; i < invPmts.length; i++) {
      txnDTOs.push(this.sanitize(invPmts[i]));
    }
    return txnDTOs;
  }
}
