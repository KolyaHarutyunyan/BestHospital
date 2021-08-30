import { model, Schema, Types } from 'mongoose';
import { TerminationSchema } from '../termination';
import { UserStatus } from './staff.constants';
import { IStaffCredential } from './interface';

const StaffCredentialSchema = new Schema({
    staffId: { type: Types.ObjectId, ref: 'Staff' },
    credentialId: { type: Types.ObjectId, ref: 'Credential' },
    expirationDate: { type: Date, default: null},
});

export const StaffCredentialModel = model<IStaffCredential>('StaffCredential', StaffCredentialSchema);