import { Document } from 'mongoose';

export interface IEmployment extends Document {
    staffId: string;
    departmentId: string;
    termination: string;
    schedule: string;
    supervisor: string;
    date: String;
}