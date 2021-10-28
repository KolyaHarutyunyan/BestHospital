import { Document } from 'mongoose';
import { ITermination } from '../../termination/interface';

export interface IMileage extends Document {
    id: string;
    compensation: number;
    startDate: Date;
    endDate: Date;
}
