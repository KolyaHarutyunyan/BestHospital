import { model, Schema, Types } from 'mongoose';
import { IAppointment } from './interface';
import { EventStatus, AppointmentType } from './appointment.constants';

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
    status: { type: String, enum: EventStatus },
    isRepeat: { type: Boolean, default: false },
    miles: { type: String, default: null }
});

export const AppointmentModel = model<IAppointment>('appointment', appointmentSchema);