import { model, Schema, Types } from 'mongoose';
import { addressSchema } from '../address';
import { IAuthorizationService } from './interface';

const AuthorizationServiceSchema = new Schema({
    clientId: { type: Types.ObjectId, ref: 'Client' },
    service: { type: String },
    modifiers: { type: Array },
    total: { type: String },
    completed: { type: String },
    available: { type: String },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: null },
});

export const ClientAuthorizationServiceModel = model<IAuthorizationService>('ClientAuthorizationService', AuthorizationServiceSchema);
