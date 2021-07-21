import { Document } from 'mongoose';

export interface ICredential extends Document {
    name: string
}
