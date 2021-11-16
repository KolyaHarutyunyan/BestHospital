import { model, Schema, Types } from 'mongoose';
import { IService } from './interface';

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