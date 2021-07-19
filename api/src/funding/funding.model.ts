import { model, Schema, Types } from 'mongoose';
import { addressSchema } from '../address';
import { IFunder } from './interface';

// adminId: { type: Types.ObjectId, ref: 'auth' },

const FundingSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    type: { type: String, required: true },
    address: addressSchema,
    contact: { type: String, required: true },
    website: { type: String, required: true },
    status: { type: String },
});

export const FundingModel = model<IFunder>('Funder', FundingSchema);
