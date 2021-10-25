import { Document } from 'mongoose';
import { ITermination } from '../../termination/interface';

export interface IClient extends Document {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    code: string;
    ethnicity: string;
    language: string;
    familyLanguage: string;
    gender: string;
    status: string;
    birthday: Date;
    termination: ITermination;
    enrollment: string;
}
