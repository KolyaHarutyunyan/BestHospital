import { model, Schema } from 'mongoose';
import { addressSchema } from '../address';
import { TerminationSchema } from '../termination';
import { UserStatus } from './staff.constants';
import { IStaff } from './interface';

const StaffSchema = new Schema({
  email: { type: String, unique: true },
  secondaryEmail: { type: String },
  firstName: { type: String} ,
  lastName: { type: String },
  middleName: { type: String},
  phone: { type: String},
  secondaryPhone: { type: String },
  state: { type: String },
  gender: { type: String },
  birthday: { type: String },
  residency: { type: String },
  ssn: { type: Number },
  status: { type: Number, enum: UserStatus },
  createdDate: { type: Date, default: Date.now },
  // availability: {type: Number, enum: UserAvailabilityStatus}
  // termination: terminationSchema,
  // credentailStatus: { type: Number, enum: CredentialsStatus }
  // employmentId: { type: Types.ObjectId, ref: 'Employment' },
  address: addressSchema
});

export const StaffModel = model<IStaff>('Staff', StaffSchema);
