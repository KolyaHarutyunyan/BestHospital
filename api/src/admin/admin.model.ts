import { model, Schema } from 'mongoose';
import { IAdmin } from './interface';

const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export const AdminModel = model<IAdmin>('Admin', AdminSchema);
