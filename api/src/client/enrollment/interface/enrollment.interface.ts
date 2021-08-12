import { Document } from 'mongoose';

export interface IEnrollment extends Document {
    id: string;
    clientId: string;
    funderId: string;
    primary: boolean;
    startDate: string;
    terminationDate: string;
    enrollmentId?: string;
}
