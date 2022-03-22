import { model, Schema, Types } from 'mongoose';
import { FileSchema } from '../files/file.model';
import { IPosting } from './interface/posting.interface';
import { PaymentType } from './posting.constants';

const TransactionSchema = new Schema({
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
  paymentDate: { type: Date, default: Date.now() },
  payer: { type: Types.ObjectId, ref: 'Client' },
  invoice: { type: Types.ObjectId, ref: 'invoice' },
  documents: [{ type: Types.ObjectId, ref: 'file' }],
  transaction: [TransactionSchema],
});

export const PostingModel = model<IPosting>('posting', PostingSchema);
