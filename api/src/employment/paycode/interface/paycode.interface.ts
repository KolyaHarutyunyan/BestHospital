import { Document } from 'mongoose';

export interface IPayCode extends Document {
    id: string;
    employmentId: string;
    payCodeTypeId: string;
    rate: number;
    active: boolean;
    startDate: Date;
    endDate?: Date;
}