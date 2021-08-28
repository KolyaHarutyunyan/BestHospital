import { Document } from 'mongoose';
import { IAddress } from '../../../address';

export interface IAuthorization extends Document {
    id: string;
    clientId: string;
    authId: string;
    funderId: string;
    startDate: Date;
    endDate: Date;
    location: string;
    status: number;
}