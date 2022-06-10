import { model, Schema, Types } from 'mongoose';
import { IAuth } from './interface';
import { ClientAuthServiceModel } from '../auth-service/auth-service.model';
import { AuthorizationStatus, DocumentStatus } from './auth.constants';
import { FileSchema } from '../../files/file.model';
const authDocSchema = new Schema({
  name: { type: String },
  file: FileSchema,
  status: { type: String, enum: [DocumentStatus] },
});
const AuthSchema = new Schema({
  clientId: { type: Types.ObjectId, ref: 'Client' },
  authId: { type: String },
  funderId: { type: Types.ObjectId, ref: 'Funder' },
  // petqa partadir active enrollmenti tak lini aysinqn ete terminate chi
  startDate: { type: String },
  endDate: { type: String },
  // start u end@ partadir field en
  status: { type: String, enum: [AuthorizationStatus] },
  createdDate: { type: Date, default: Date.now() },
  updatedDate: { type: Date, default: null },
  documents: [authDocSchema],
  location: { type: String }, // adrressSchema
});

AuthSchema.pre('remove', async function (next) {
  await ClientAuthServiceModel.deleteMany({ authorizationId: this._id });
  next();
});

export const ClientAuthorizationModel = model<IAuth>('ClientAuth', AuthSchema);
