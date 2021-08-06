import { model, Schema, Types } from 'mongoose';
import { IEmployment, ScheduleStatus } from '../employment';
import { TerminationSchema } from '../termination';

const EmploymentSchema = new Schema({
    departmentId: { type: Types.ObjectId, ref: 'Department', require: false },
    supervisor: { type: Types.ObjectId, ref: 'Staff', default: null },
    schedule: { type: Number, enum: ScheduleStatus },
    termination: TerminationSchema,
    date: { type: Date, default: Date.now }
});

export const EmploymentModel = model<IEmployment>('Employment', EmploymentSchema);
