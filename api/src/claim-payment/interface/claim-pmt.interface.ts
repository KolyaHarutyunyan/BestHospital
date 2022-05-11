import { PaymentType } from '../claim-pmt.contants';

export interface IClaimPmt extends Document {
  _id: string;
  paymentAmount: number;
  paymentType: PaymentType | string;
  paymentDate: Date;
  checkNumber: string;
  fundingSource: string;
  claimIds: string[];
  documents: string[];
}
