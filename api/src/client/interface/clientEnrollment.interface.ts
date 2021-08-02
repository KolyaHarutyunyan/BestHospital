import { Document } from 'mongoose';
import { IAddress } from '../../address';

export interface IEnrollment extends Document {
    fundingSource: string;
    primary: boolean;
    startDate: string;
    terminationDate: string;
}
