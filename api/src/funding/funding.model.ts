import { model, Schema } from 'mongoose';
import { addressSchema } from '../address';
import { FundingStatus } from './funding.constants';
import { IFunder } from './interface';

export const TerminationSchema = {
  date: { type: Date },
  reason: { type: String },
};

const FundingSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  type: { type: String, required: true },
  address: addressSchema,
  contact: { type: String, required: true },
  website: { type: String, required: true },
  termination: TerminationSchema,
  status: { type: String, enum: FundingStatus, default: FundingStatus.ACTIVE },
});

export const FundingModel = model<IFunder>('Funder', FundingSchema);
