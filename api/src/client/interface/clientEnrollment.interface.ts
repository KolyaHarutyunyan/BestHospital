import { Document } from 'mongoose';
import { IAddress } from '../../address';

export interface IEnrollment extends Document {
    id: string;
    clientId: string;
    fundingSource: string;
    primary: boolean;
    startDate: string;
    terminationDate: string;
    enrollmentId?: string;
}
