import { model, Schema, Types } from 'mongoose';
import { IModify } from './interface';
import { ModifierStatus, TypeStatus } from './funding.constants';

const modifierSchema = new Schema({
    chargeRate: { type: Number },
    credential: { type: Types.ObjectId, ref: 'Credential' },
    name: { type: String },
});

export const ModifyModel = model<IModify>('Modifier', modifierSchema);