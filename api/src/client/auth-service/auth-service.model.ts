import { model, Schema, Types } from 'mongoose';
import { IAuthService } from './interface';

const AuthServiceSchema = new Schema({
  authorizationId: { type: Types.ObjectId, ref: 'ClientAuth' },
  serviceId: { type: Types.ObjectId, ref: 'FundingService' },
  modifiers: [{ type: Types.ObjectId }],
  authModifiers: [],
  default: { type: Boolean, default: false },
  total: { type: Number },
  completed: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now() },
  updatedDate: { type: Date, default: null },
});

export const ClientAuthServiceModel = model<IAuthService>('ClientAuthService', AuthServiceSchema);
