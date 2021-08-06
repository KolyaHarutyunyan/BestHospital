import { Document } from 'mongoose';
import { IAddress } from '../../address';

export interface IAuthorizationService extends Document {
    id: string;
    clientId: string;
    service: string;
    modifiers: string;
    total: string;
    completed: string;
    available: string;
}
