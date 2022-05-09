import { Document } from 'mongoose';

export interface ITransaction {
  type: string;
  date: Date;
  amount: number;
  paymentRef: string;
  creator: string;
  note: string;
}

export interface IInvPmt extends Document {
  paymentType: string;
  paymentReference: string;
  paymentAmount: number;
  payer: string;
  invoice: string;
  paymentDate: Date;
  transaction: ITransaction[];
  documents: string[];
}
