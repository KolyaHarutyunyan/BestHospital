import { model, Schema, Types } from 'mongoose';
import { IAuth } from './interface';
import { ClientAuthServiceModel } from '../auth-service/auth-service.model';
import { AuthorizationStatus } from './auth.constants';

const AuthSchema = new Schema({
  clientId: { type: Types.ObjectId, ref: 'Client' },
  authId: { type: String },
  funderId: { type: Types.ObjectId, ref: 'Funder' },
  startDate: { type: String },
  endDate: { type: String },
  status: { type: String, enum: [AuthorizationStatus] },
  createdDate: { type: Date, default: Date.now() },
  updatedDate: { type: Date, default: null },
  location: { type: String }, // adrressSchema
});

AuthSchema.pre('remove', async function (next) {
  await ClientAuthServiceModel.deleteMany({ authorizationId: this._id });
  next();
});

export const ClientAuthorizationModel = model<IAuth>('ClientAuth', AuthSchema);
