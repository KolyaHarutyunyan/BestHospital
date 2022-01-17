import { Document } from 'mongoose';

export interface IPosting extends Document {
  paymentType: string;
  paymentReference: string;
  paymentDocument: string;
  paymentAmount: number;
  payer: string;
  invoices: Array<string>;
}
