import { Document } from 'mongoose';

export interface ICredential extends Document {
    _id: string;
    staffId: string,
    credentialId: string,
    expirationDate: Date,
    receiveData: string
}