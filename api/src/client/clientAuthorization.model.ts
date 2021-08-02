import { model, Schema, Types } from 'mongoose';
import { addressSchema } from '../address';
import { IAuthorization } from './interface/clientAuthorization.interface';
// adminId: { type: Types.ObjectId, ref: 'auth' },

const AuthorizationSchema = new Schema({
    clientId: { type: Types.ObjectId, ref: 'Client' },
    authorizationId: { type: String },
    fundingSource: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: null },
    // address: addressSchema,
});

export const ClientAuthorizationModel = model<IAuthorization>('ClientAuthorization', AuthorizationSchema);
