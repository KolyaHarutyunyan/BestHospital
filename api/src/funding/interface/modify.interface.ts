import { Document } from 'mongoose';

export interface IModify extends Document {
    id: string;
    serviceId: string, 
    chargeRate: number,
    credentialId: string, 
    name: string,
    type: number
}
