import { Document } from 'mongoose';

export interface IModify extends Document {
    id: string;
    chargeRate: number,
    credential: any, 
    name: string,
    type: Number
}
