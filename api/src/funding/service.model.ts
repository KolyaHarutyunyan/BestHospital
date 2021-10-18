import { model, Schema, Types } from 'mongoose';
import { IService } from './interface';
import { ModifierStatus, TypeStatus } from './funding.constants';

const chargeSchema = new Schema({
    chargeRate: { type: Number },
    credentials: [{ type: Types.ObjectId, ref: 'Credential' }],
    modifier: { type: String },
});

export const serviceSchema = new Schema({
    funderId: { type: Types.ObjectId, ref: 'Funder' },
    serviceId: { type: Types.ObjectId, ref: 'Service' },
    name: { type: String },
    rate: { type: Number },
    cptCode: { type: String },
    size: { type: Number },
    min: { type: Number },
    max: { type: Number }
});

export const ServiceModel = model<IService>('FundingService', serviceSchema);