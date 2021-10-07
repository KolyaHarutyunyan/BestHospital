import { model, Schema, Types } from 'mongoose';
import { addressSchema } from '../address';
// import { TerminationSchema } from '../termination';
import { UserStatus } from './staff.constants';
import { IStaff } from './interface';

export const TerminationSchema = {
  date: { type: Date },
  reason: { type: String }
}
export const LicenseSchema = {
  driverLicense: { type: String },
  expireDate: { type: String },
  state: { type: String }
}

const StaffSchema = new Schema({
  email: { type: String, unique: true },
  service: [{ type: Types.ObjectId, ref: 'Service' }],
  secondaryEmail: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  middleName: { type: String },
  phone: { type: String },
  secondaryPhone: { type: String },
  state: { type: String },
  gender: { type: String },
  birthday: { type: Date },
  residency: { type: String },
  ssn: { type: Number },
  status: { type: Number, enum: UserStatus, default: 1 },
  createdDate: { type: Date, default: Date.now },
  license: LicenseSchema,
  // availability: {type: Number, enum: UserAvailabilityStatus}
  termination: TerminationSchema,
  // credentailStatus: { type: Number, enum: CredentialsStatus }
  // employmentId: { type: Types.ObjectId, ref: 'Employment' },
  address: addressSchema
});

export const StaffModel = model<IStaff>('Staff', StaffSchema);
