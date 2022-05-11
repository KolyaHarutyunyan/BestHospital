import { Document } from 'mongoose';

export interface IInvPmt extends Document {
  paymentType: string;
  paymentRef: string;
  paymentAmount: number;
  paymnetDate: Date;
  invoices: string[];
  paymentDate: Date;
  checkNumber: string;
  eob: string;
  client: string;
}
