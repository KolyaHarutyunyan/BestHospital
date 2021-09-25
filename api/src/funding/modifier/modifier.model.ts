import { model, Schema, Types } from 'mongoose';
// import { IModify } from './interface';
import { ModifierStatus, TypeStatus } from '../funding.constants';

export const modifier = {
    chargeRate: { type: Number },
    credentialId: { type: Types.ObjectId, ref: 'Credential' },
    name: { type: String },
    type: { type: Number, enum: TypeStatus }
}

const modifierSchema = new Schema({
    serviceId: { type: Types.ObjectId, ref: 'FundingService' },
    modifiers: [modifier]
});

export const ModifyModel = model<any>('Modifier', modifierSchema);