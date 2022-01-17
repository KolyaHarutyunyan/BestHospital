import { model, Schema, Types } from 'mongoose';
import { IPosting } from './interface/posting.interface';
import { PaymentType } from './posting.constants';

const PostingSchema = new Schema({
  paymentType: { type: String, enum: PaymentType },
  paymentReference: { type: String },
  paymentDocument: { type: String },
  paymentAmount: { type: Number },
  payer: { type: Types.ObjectId, ref: 'Client' },
  invoices: [String],
});

export const PostingModel = model<IPosting>('posting', PostingSchema);
