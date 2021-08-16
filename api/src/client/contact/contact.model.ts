import { model, Schema, Types } from 'mongoose';
import { IContact } from './interface';

const ContactSchema = new Schema({
    clientId: {type: Types.ObjectId, ref: 'Client'},
    firstName: { type: String },
    lastName: { type: String },
    relationship: { type: String },
    phoneNumber: { type: String },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: null },
});

export const ClientContactModel = model<IContact>('ClientContact', ContactSchema);
