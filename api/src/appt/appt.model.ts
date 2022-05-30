import { model, Schema, Types } from 'mongoose';
import { IAppt } from './interface';
import { EventStatus, ApptType, ApptStatus } from './appt.constants';
import { addressSchema } from '../address';
import { FileSchema } from '../files/file.model';

export const apptSchema = new Schema({
  type: { type: String, enum: ApptType },
  client: { type: Types.ObjectId, ref: 'Client', default: null },
  authorizedService: { type: Types.ObjectId, ref: 'ClientAuthService', default: null },
  payer: { type: Types.ObjectId, ref: 'Funder' },
  placeService: { type: Types.ObjectId, ref: 'Place' },
  staff: { type: Types.ObjectId, ref: 'Staff' },
  staffPayCode: { type: Types.ObjectId, ref: 'PayCode' },
  startDate: { type: Date },
  startTime: { type: Date },
  endTime: { type: Date },
  require: { type: Boolean },
  eventStatus: { type: String, enum: EventStatus },
  cancelReason: { type: String },
  status: { type: String, enum: ApptStatus },
  isRepeat: { type: Boolean, default: false },
  miles: { type: String, default: null },
  address: addressSchema,
  signature: { type: Boolean },
  digitalSignature: { type: FileSchema },
});

export const ApptModel = model<IAppt>('appt', apptSchema);
