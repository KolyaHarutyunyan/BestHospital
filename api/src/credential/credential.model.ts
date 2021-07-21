import { model, Schema, Types } from 'mongoose';
import { ICredential } from './interface';

export const credentialSchema = new Schema({
    name: { type: String }
});

export const CredentialModel = model<ICredential>('Credential', credentialSchema);