import { model, Schema } from 'mongoose';
import { addressSchema } from '../address';
import { IStaff } from './interface';

const StaffSchema = new Schema({
  firstEmail: { type: String, required: true, unique: true },
  secondEmail: { type: String, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: true },
  firstNumber: { type: String, required: true },
  secondNumber: { type: String, required: true },
  driveLicenze: { type: String, required: true },
  state: { type: String, required: true },
  gender: { type: String, required: true },
  birthday: { type: String, required: true },
  residency: { type: String, required: true },
  ssn: { type: Number, required: true },
  address: addressSchema,
});

export const StaffModel = model<IStaff>('Staff', StaffSchema);
