import { PaymentType } from '../claim-pmt.contants';

export interface IClaimPmt extends Document {
  _id: string;
  paymentAmount: number;
  paymentType: PaymentType;
  paymnetDate: Date;
  checkNumber: string;
  achNumber: string;
  fundingSource: string;
  claimId: string;
  documents: string[];
}
