import { model, Schema, Types } from 'mongoose';
import { IEnrollment } from './interface';

const ClientEnrollmentSchema = new Schema({
    clientId: { type: Types.ObjectId, ref: 'Client' },
    funderId: {type: Types.ObjectId, ref: "Funder"},
    primary: { type: Boolean },
    startDate: { type: Date },
    terminationDate: { type: Date },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: null },
});

export const ClientEnrollmentModel = model<IEnrollment>('ClientEnrollment', ClientEnrollmentSchema);
