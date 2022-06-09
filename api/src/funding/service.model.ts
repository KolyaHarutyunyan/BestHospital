import { model, Schema, Types } from 'mongoose';
import { TypeStatus } from './funding.constants';
import { IService } from './interface';

export const modifier = new Schema({
  chargeRate: { type: Number },
  credentialId: { type: Types.ObjectId, ref: 'Credential' },
  name: { type: String },
  type: { type: String, enum: TypeStatus },
  status: { type: Boolean, default: true },
});

export const serviceSchema = new Schema({
  funderId: { type: Types.ObjectId, ref: 'Funder' },
  serviceId: { type: Types.ObjectId, ref: 'Service' },
  rate: { type: Number },
  cptCode: { type: String },
  size: { type: Number },
  min: { type: Number },
  max: { type: Number },
  chargeRate: { type: Number },
  credentialId: { type: Types.ObjectId, ref: 'Credential' },
  modifiers: [modifier],
});

export const ServiceModel = model<IService>('FundingService', serviceSchema);
