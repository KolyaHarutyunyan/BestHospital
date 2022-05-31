import { model, Schema, Types } from 'mongoose';
import { FileSchema } from '../files/file.model';
import { IInvPmt } from './interface/invoice-pmt.interface';
import { DocumentStatus, InvPmtStatus, PaymentType } from './invoice-pmt.constants';
const InvPmtDocSchema = new Schema({
  name: { type: String },
  file: FileSchema,
  status: { type: String, enum: [DocumentStatus] },
});
const InvPmtSchema = new Schema({
  paymentType: { type: String, enum: PaymentType },
  checkNumber: { type: String },
  paymentAmount: { type: Number },
  totalBilled: { type: Number, default: 0 },
  totalUsed: { type: Number, default: 0 },
  paymentDate: { type: Date, default: Date.now() },
  status: { type: String, enum: [InvPmtStatus], default: InvPmtStatus.OPEN },
  client: { type: Types.ObjectId, ref: 'Client' },
  invoices: [{ type: Types.ObjectId, ref: 'invoice' }],
  documents: [InvPmtDocSchema],
});

export const InvPmtModel = model<IInvPmt>('invPmt', InvPmtSchema);
