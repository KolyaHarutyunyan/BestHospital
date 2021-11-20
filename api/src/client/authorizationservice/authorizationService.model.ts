import { model, Schema, Types } from 'mongoose';
import { IAuthorizationService } from './interface';

const AuthorizationServiceSchema = new Schema({
    authorizationId: { type: Types.ObjectId, ref: 'ClientAuthorization' },
    serviceId: { type: Types.ObjectId, ref: 'FundingService' },
    modifiers: [{ type:  Object }],
    total: { type: Number },
    completed: { type: Number, default: 0 },
    available: { type: Number, default: 0 },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: null },
});

export const ClientAuthorizationServiceModel = model<IAuthorizationService>('ClientAuthorizationService', AuthorizationServiceSchema);

