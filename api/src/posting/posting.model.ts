import { model, Schema, Types } from 'mongoose';
import { IPosting } from './interface/posting.interface';
import {PaymentType} from './'
const PostingSchema = new Schema({
  client: { type: Types.ObjectId, ref: 'Client' },
  dateRange: { early: { type: Date }, latest: { type: Date } },
  paymentType: { type: String, enum: PaymentType },
  totalTime: { type: Number },
  dueDate: { type: Date },
  downloadLink: { type: String },
  status: { type: String, enum: InvoiceStatus },
  receivable: [receivable],
});

export const PostingModel = model<IPosting>('posting', PostingSchema);
