import { model, Schema, Types } from 'mongoose';
import { IPosting } from './interface/posting.interface';
import { PaymentType } from './posting.constants';

const TransactionSchema = new Schema({
  transaction: { typ: String },
  date: { type: Date },
  amount: { type: Number },
  paymentRef: { type: String },
  creator: { type: Types.ObjectId, ref: 'Staff' },
  note: { type: String },
  status: { type: String },
});

const PostingSchema = new Schema({
  paymentType: { type: String, enum: PaymentType },
  paymentReference: { type: String },
  paymentDocument: { type: String },
  paymentAmount: { type: Number },
  payer: { type: Types.ObjectId, ref: 'Client' },
  invoices: [String],
  transaction: [TransactionSchema],
});

export const PostingModel = model<IPosting>('posting', PostingSchema);
