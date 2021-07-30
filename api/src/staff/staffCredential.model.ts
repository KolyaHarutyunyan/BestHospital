import { model, Schema, Types } from 'mongoose';
import { TerminationSchema } from '../termination';
import { UserStatus } from './staff.constants';
import { IStaffCredential } from './interface';

const StaffCredentialSchema = new Schema({
    credentialId: { type: Types.ObjectId, ref: 'Credential' },
    expirationDate: { type: Date, default: null},
    // availability: {type: Number, enum: UserAvailabilityStatus}
    // termination: terminationSchema,
    // credentailStatus: { type: Number, enum: CredentialsStatus }
    // employmentId: { type: Types.ObjectId, ref: 'Employment' },
});

export const StaffCredentialModel = model<IStaffCredential>('StaffCredential', StaffCredentialSchema);