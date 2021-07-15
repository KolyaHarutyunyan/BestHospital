import { model, Schema, Types } from 'mongoose';
import { addressSchema } from '../address';
import { IFunder } from './interface';

const CommentSchema = new Schema({
    text: { type: String },
    created: { type: Date, default: Date.now },
    user: { type: Types.ObjectId, ref: 'Admin' }
});

const FundingSchema = new Schema({
    adminId: { type: Types.ObjectId, ref: 'auth' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    type: { type: String, required: true },
    address: addressSchema,
    contact: { type: String, required: true },
    website: { type: String, required: true },
    status: { type: String },
    comments: [CommentSchema]
});

export const FundingModel = model<IFunder>('Funder', FundingSchema);
