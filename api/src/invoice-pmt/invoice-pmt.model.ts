import { model, Schema, Types } from 'mongoose';
import { FileSchema } from '../files/file.model';
import { IInvPmt } from './interface/invoice-pmt.interface';
import { PaymentType } from './invoice-pmt.constants';

const InvPmtSchema = new Schema({
  paymentType: { type: String, enum: PaymentType },
  paymentReference: { type: String },
  paymentAmount: { type: Number },
  paymentDate: { type: Date, default: Date.now() },
  client: { type: Types.ObjectId, ref: 'Client' },
  invoices: [{ type: Types.ObjectId, ref: 'invoice' }],
  eob: { type: Types.ObjectId, ref: 'file' },
});

export const InvPmtModel = model<IInvPmt>('invPmt', InvPmtSchema);
