import { model, Schema, Types } from 'mongoose';
import { addressSchema } from '../../address';
import { IAuthorization } from './interface';
import { ClientAuthorizationServiceModel } from '../authorizationservice/authorizationService.model';

const AuthorizationSchema = new Schema({
    clientId: { type: Types.ObjectId, ref: 'Client' },
    authId: { type: String },
    funderId: { type: Types.ObjectId, ref: 'Funder' },
    startDate: { type: String },
    endDate: { type: String },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: null },
    address: addressSchema,
});

AuthorizationSchema.pre('remove', async function (next) {
    await ClientAuthorizationServiceModel.deleteMany({ authorizationId: this._id });
    next();
});

export const ClientAuthorizationModel = model<IAuthorization>('ClientAuthorization', AuthorizationSchema);
