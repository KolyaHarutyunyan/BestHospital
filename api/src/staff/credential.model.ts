import { model, Schema, Types } from 'mongoose';
import { ICredential } from '../credential/interface';
import { CredentialsStatus } from '../credential/credential.constants';

export const credentialSchema = new Schema({
    name: { type: String },
    type: { type: Number, enum: CredentialsStatus }
});

export const CredentialModel = model<ICredential>('Credential', credentialSchema);