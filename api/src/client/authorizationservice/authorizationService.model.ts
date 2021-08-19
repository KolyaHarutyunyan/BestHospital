import { model, Schema, Types } from 'mongoose';
import { IAuthorizationService } from './interface';

const AuthorizationServiceSchema = new Schema({
    authorizationId: { type: Types.ObjectId, ref: 'ClientAuthorization' },
    serviceId: { type: Types.ObjectId, ref: 'FundingService' },
    modifiers: [{ type:  Types.ObjectId, ref: 'Modifier' }],
    total: { type: Number },
    // completed: { type: Number },
    // available: { type: Number },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: null },
});

export const ClientAuthorizationServiceModel = model<IAuthorizationService>('ClientAuthorizationService', AuthorizationServiceSchema);

