import { model, Schema } from 'mongoose';
import { addressSchema } from '../address';
import { TerminationSchema } from '../termination';
import { UserStatus } from './staff.constants';
import { IStaff } from './interface';

const StaffSchema = new Schema({
  email: { type: String, required: true, unique: true },
  secondaryEmail: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: true },
  phone: { type: String, required: true },
  secondaryPhone: { type: String, required: true },
  state: { type: String, required: true },
  gender: { type: String, required: true },
  birthday: { type: String, required: true },
  residency: { type: String, required: true },
  ssn: { type: Number, required: true },
  status: { type: Number, enum: UserStatus },
  createdDate: { type: Date, default: Date.now },
  // availability: {type: Number, enum: UserAvailabilityStatus}
  // termination: terminationSchema,
  // credentailStatus: { type: Number, enum: CredentialsStatus }
  // employmentId: { type: Types.ObjectId, ref: 'Employment' },
  address: addressSchema
});

export const StaffModel = model<IStaff>('Staff', StaffSchema);
