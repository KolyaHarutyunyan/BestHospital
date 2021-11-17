import { model, Schema, Types } from 'mongoose';
import { TypeStatus } from './funding.constants';
import { IService } from './interface';

export const modifier = {
    chargeRate: { type: Number },
    credentialId: { type: Types.ObjectId, ref: 'Credential' },
    name: { type: String },
    type: { type: Number, enum: TypeStatus }
}

export const serviceSchema = new Schema({
    funderId: { type: Types.ObjectId, ref: 'Funder' },
    serviceId: { type: Types.ObjectId, ref: 'Service' },
    name: { type: String },
    rate: { type: Number },
    cptCode: { type: String },
    size: { type: Number },
    min: { type: Number },
    max: { type: Number },
    modifiers: [modifier]
});

export const ServiceModel = model<IService>('FundingService', serviceSchema);