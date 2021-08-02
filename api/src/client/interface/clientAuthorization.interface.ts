import { Document } from 'mongoose';
import { IAddress } from '../../address';

export interface IAuthorization extends Document {
    id: string;
    clientId: string;
    authorizationId: string;
    fundingSource: string;
    startDate: string;
    endDate: string;
}