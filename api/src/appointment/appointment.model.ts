import { model, Schema, Types } from 'mongoose';
import { IAppointment } from './interface';
import { EventStatus } from './appointment.constants';

export const appointmentSchema = new Schema({
    client: { type: Types.ObjectId, ref: 'Client' },
    authorizedService: { type: Types.ObjectId, ref: 'ClientAuthorizationService' },
    staff: { type: Types.ObjectId, ref: 'Staff' },
    staffPayCode: { type: Types.ObjectId, ref: 'PayCode' },
    startDate: { type: Date },
    startTime: { type: Date },
    endTime: { type: Date, default: Date.now },
    require: { type: Boolean },
    status: { type: String, enum: EventStatus },
});

export const HistoryModel = model<IAppointment>('appointment', appointmentSchema);