import { Document } from 'mongoose';
import { IAddress } from '../../address';

export interface IContact extends Document {
    firstName: string;
    lastName: string;
    relationship: string;
    phoneNumber: string;
}
