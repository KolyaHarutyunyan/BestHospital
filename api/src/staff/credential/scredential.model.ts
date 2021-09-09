import { model, Schema, Types } from 'mongoose';
import { ICredential } from './interface';

const StaffCredentialSchema = new Schema({
    staffId: { type: Types.ObjectId, ref: 'Staff' },
    credentialId: { type: Types.ObjectId, ref: 'Credential' },
    expirationDate: { type: Date, default: null },
    receiveDate: { type: String }
});

export const StaffCredentialModel = model<ICredential>('StaffCredential', StaffCredentialSchema);