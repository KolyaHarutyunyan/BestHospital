import { model, Schema, Types } from 'mongoose';
import { ITxn } from './interface';
import { TxnStatus, TxnType } from './txn.constants';

const TxnSchema = new Schema(
  {
    billing: { type: Types.ObjectId, ref: 'billing' },
    type: { type: String, enum: TxnType },
    rate: { type: Number, default: 0 },
    paymentRef: { type: String },
    note: { type: String },
    date: { type: Date },
    status: { type: String, enum: TxnStatus },
    creator: { type: Types.ObjectId, ref: 'Staff' },
  },
  { timestamps: true },
);

// TransactionSchema.pre('findOneAndUpdate', async function () {
//   await this.model.updateMany(
//     { creator: this.getQuery()._id },
//     { $set: { status: TransactionStatus.VOID } },
//   );
// });

export const TxnModel = model<ITxn>('Txn', TxnSchema);
