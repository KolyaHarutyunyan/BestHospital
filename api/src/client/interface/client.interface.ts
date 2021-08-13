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
    age: number;
    status: number;
    birthday: string;
    enrollment: string;
}
