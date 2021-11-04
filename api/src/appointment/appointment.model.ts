import { model, Schema, Types } from 'mongoose';
import { IAppointment } from './interface';
import { EventStatus, AppointmentType, AppointmentStatus } from './appointment.constants';
import { addressSchema } from '../address';

export const appointmentSchema = new Schema({
    type: { type: String, enum: AppointmentType },
    client: { type: Types.ObjectId, ref: 'Client', default: null },
    authorizedService: { type: Types.ObjectId, ref: 'ClientAuthorizationService', default: null },
    staff: { type: Types.ObjectId, ref: 'Staff' },
    staffPayCode: { type: Types.ObjectId, ref: 'PayCode' },
    startDate: { type: Date },
    startTime: { type: Date },
    endTime: { type: Date, default: Date.now },
    require: { type: Boolean },
    eventStatus: { type: String, enum: EventStatus },
    status: { type: String, enum: AppointmentStatus },
    isRepeat: { type: Boolean, default: false },
    miles: { type: String, default: null },
    address: addressSchema
});

export const AppointmentModel = model<IAppointment>('appointment', appointmentSchema);