import { model, Schema } from 'mongoose';
import { addressSchema } from '../address';
import { IAdmin } from './interface';

const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  ssn: { type: Number, required: true },
  dl: { type: String, required: true },
  address: addressSchema,
});

export const AdminModel = model<IAdmin>('Admin', AdminSchema);
