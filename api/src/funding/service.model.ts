import { model, Schema, Types } from 'mongoose';
import { IService } from './interface';
import { ModifierStatus, TypeStatus } from './funding.constants';

export const serviceSchema = new Schema({
    funderId: { type: Types.ObjectId, ref: 'Funder' },
    serviceId: { type: Types.ObjectId, ref: 'Service' },
    name: { type: String },
    rate: { type: Number },
    cptCode: { type: Number },
    size: { type: Number },
    min: { type: Number },
    max: { type: Number },
    displayCode: { type: String },
    // category: { type: String },
    credentials: [{ type: Types.ObjectId, ref: 'Credential' }],
    modifier: { type: Number, enum: ModifierStatus },
    type: { type: String, enum: TypeStatus }
});

export const ServiceModel = model<IService>('FundingService', serviceSchema);