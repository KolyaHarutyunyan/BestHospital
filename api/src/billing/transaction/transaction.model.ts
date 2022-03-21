import { model, Schema, Types } from 'mongoose';
import { ITransaction } from './interface';
import { TransactionStatus, TransactionType } from './transaction.constants';

const TransactionSchema = new Schema({
  billing: { type: Types.ObjectId, ref: 'billing' },
  type: { type: String, enum: TransactionType },
  rate: { type: Number, default: 0 },
  paymentRef: { type: String },
  note: { type: String },
  date: { type: Date },
  status: { type: String, enum: TransactionStatus },
  creator: { type: Types.ObjectId, ref: 'Staff' },
});

// TransactionSchema.pre('findOneAndUpdate', async function () {
//   await this.model.updateMany(
//     { creator: this.getQuery()._id },
//     { $set: { status: TransactionStatus.VOID } },
//   );
// });

export const TransactionModel = model<ITransaction>('BillingTransaction', TransactionSchema);
