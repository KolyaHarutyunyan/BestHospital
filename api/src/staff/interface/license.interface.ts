import { Document } from 'mongoose';

export interface ILicense extends Document {
    driverLicense: string;
    expireDate: Date;
    state: string;
}