import { Document } from 'mongoose';

export interface ICredential extends Document {
    id: string;
    name: string
    type: number
}