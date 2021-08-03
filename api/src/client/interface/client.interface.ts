import { Document } from 'mongoose';

export interface IClient extends Document {
    firstName: string;
    middleName: string;
    lastName: string;
    code: string;
    ethnicity: string;
    language: string;
    familyLanguage: string;
    gender: string;
    status: number;
    birthday: string;
    contacts: Array<Object>;
    enrollments: Array<Object>;
    enrollment: string
}