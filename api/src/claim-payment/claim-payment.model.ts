import { model, Schema, Types } from 'mongoose';
import { IClaimPayment } from './interface';

const ClaimPaymentSchema = new Schema({
  paymentDate: { type: Date, default: Date.now() },
  paymentAmount: { type: Number },
  claim: { type: Types.ObjectId, ref: 'claim' },

  //   payer: { type: Types.ObjectId, ref: 'Client' },
});

export const PostingModel = model<IClaimPayment>('claimPayment', ClaimPaymentSchema);
