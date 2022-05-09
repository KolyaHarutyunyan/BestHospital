import { model, Schema, Types } from 'mongoose';
import { FileSchema } from '../files/file.model';
import { PaymentType } from './claim-pmt.contants';
import { IClaimPmt } from './interface';

const ClaimPmtSchema = new Schema({
  paymentDate: { type: Date, default: Date.now() },
  paymentAmount: { type: Number },
  paymentType: { type: String, enum: [PaymentType] },
  checkNumber: { type: String },
  fundingSource: { type: Types.ObjectId, ref: 'Funder' },
  claimIds: [{ type: Types.ObjectId, ref: 'claim' }],
  documents: [{ type: Types.ObjectId, ref: 'file' }],
  // eob: FileSchema,
  // deductible: { type: Number },
  // copay: { type: Number },
  // coinsurance: { type: Number },
});
export const ClaimPmtModel = model<IClaimPmt>('claimPmt', ClaimPmtSchema);
