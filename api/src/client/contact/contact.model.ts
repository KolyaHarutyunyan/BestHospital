import { model, Schema, Types } from 'mongoose';
import { IContact } from './interface';
import { addressSchema } from '../../address';

const ContactSchema = new Schema({
  clientId: { type: Types.ObjectId, ref: 'Client' },
  firstName: { type: String },
  lastName: { type: String },
  relationship: { type: String },
  phoneNumber: { type: String },
  address: addressSchema,
  createdDate: { type: Date, default: Date.now() },
  updatedDate: { type: Date, default: null },
});

export const ClientContactModel = model<IContact>('ClientContact', ContactSchema);
