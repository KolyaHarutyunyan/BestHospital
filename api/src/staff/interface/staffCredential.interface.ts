import { Document } from 'mongoose';

export interface IStaffCredential extends Document {
    _id: string;
    staffId: string,
    credentialId: string,
    expirationDate: Date
}