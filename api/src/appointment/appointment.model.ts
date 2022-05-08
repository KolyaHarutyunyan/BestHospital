import { model, Schema, Types } from 'mongoose';
import { IAppointment } from './interface';
import { EventStatus, AppointmentType, AppointmentStatus } from './appointment.constants';
import { addressSchema } from '../address';
import { FileSchema } from '../files/file.model';

export const appointmentSchema = new Schema({
  type: { type: String, enum: AppointmentType },
  client: { type: Types.ObjectId, ref: 'Client', default: null },
  authorizedService: { type: Types.ObjectId, ref: 'ClientAuthorizationService', default: null },
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
  status: { type: String, enum: AppointmentStatus },
  isRepeat: { type: Boolean, default: false },
  miles: { type: String, default: null },
  address: addressSchema,
  signature: { type: Boolean },
  digitalSignature: { type: FileSchema },
});

export const AppointmentModel = model<IAppointment>('appointment', appointmentSchema);
