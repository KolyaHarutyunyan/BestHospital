import { model, Schema, Types } from 'mongoose';
// import { IModify } from './interface';
import { ModifierStatus, TypeStatus } from '../funding.constants';

const modifierSchema = new Schema({
    serviceId: {type: Types.ObjectId, ref: 'FundingService'},
    chargeRate: { type: Number },
    credentialId: { type: Types.ObjectId, ref: 'Credential' },
    name: { type: String },
    type: { type: Number, enum: TypeStatus }
});

export const ModifyModel = model<any>('Modifier', modifierSchema);