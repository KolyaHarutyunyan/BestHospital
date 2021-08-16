import { Document } from 'mongoose';

export interface IContact extends Document {
    firstName: string;
    lastName: string;
    relationship: string;
    phoneNumber: string;
}
