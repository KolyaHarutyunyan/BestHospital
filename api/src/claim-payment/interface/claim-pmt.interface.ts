import { ClaimPmtStatus, PaymentType } from '../claim-pmt.contants';

export interface IClaimPmt extends Document {
  _id: string;
  paymentAmount: number;
  paymentType: PaymentType | string;
  paymentDate: Date;
  checkNumber: string;
  fundingSource: string;
  totalBilled: number;
  totalUsed: number;
  claimIds: string[];
  status: ClaimPmtStatus;
  documents: string[];
}
