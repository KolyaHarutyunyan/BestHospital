import { Document } from 'mongoose';
import { IAddress } from '../../address';

export interface IFunder extends Document {
    adminId?: string;
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    type: string;
    contact: string
    website: string
    address: IAddress;
    status: number;
    comments?: any;
    histories?: any
}