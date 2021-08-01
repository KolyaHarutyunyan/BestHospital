import { model, Schema, Types } from 'mongoose';
import { addressSchema } from '../address';
import { IContact } from './interface/clientContact.interface';
// adminId: { type: Types.ObjectId, ref: 'auth' },

const ContactSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    relationship: { type: String },
    phoneNumber: { type: String },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: null },
    // address: addressSchema,
});

export const ClientContactModel = model<IContact>('ClientContact', ContactSchema);
