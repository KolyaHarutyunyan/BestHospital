import { Document } from 'mongoose';

export interface ITransaction {
  type: string;
  date: Date;
  amount: number;
  paymentRef: string;
  creator: string;
  note: string;
}

export interface IPosting extends Document {
  paymentType: string;
  paymentReference: string;
  paymentDocument: string;
  paymentAmount: number;
  payer: string;
  invoices: Array<string>;
  transaction: ITransaction[];
}
