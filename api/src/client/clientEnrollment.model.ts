import { model, Schema, Types } from 'mongoose';
import { addressSchema } from '../address';
import { IEnrollment } from './interface/clientEnrollment.interface';

const ClientEnrollmentSchema = new Schema({
    fundingSource: { type: String },
    primary: { type: Boolean },
    startDate: { type: Date },
    terminationDate: { type: Date },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: null },
});

export const ClientEnrollmentModel = model<IEnrollment>('ClientEnrollment', ClientEnrollmentSchema);

