import { Document } from 'mongoose';
import { ITermination } from '../../termination/interface';

export interface IClient extends Document {
    firstName: string;
    middleName: string;
    lastName: string;
    code: string;
    ethnicity: string;
    language: string;
    familyLanguage: string;
    gender: string;
    age: number;
    status: number;
    birthday: Date;
    termination: ITermination;
    enrollment: string;
}
