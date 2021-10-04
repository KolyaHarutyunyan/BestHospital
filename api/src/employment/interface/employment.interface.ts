import { Document } from 'mongoose';
import { TerminationDTO } from '../../termination';

export interface IEmployment extends Document {
    id: string;
    title: string;
    staffId: string;
    departmentId: string;
    termination: TerminationDTO;
    schedule: number;
    supervisor: string;
    date: Date;
}