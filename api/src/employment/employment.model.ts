import { model, Schema, Types } from 'mongoose';
import { IEmployment, ScheduleStatus } from '../employment';
import { TerminationSchema } from '../termination';

const EmploymentSchema = new Schema({
    staffId: { type: Types.ObjectId, ref: 'Staff' },
    departmentId: { type: Types.ObjectId, ref: 'Department' },
    supervisor: { type: Types.ObjectId, ref: 'Staff', default: null },
    title: { type: String },
    schedule: { type: Number, enum: ScheduleStatus },
    termination: TerminationSchema,
    active: { type: Boolean },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Schema.Types.Mixed, default: "Precent" }
});

export const EmploymentModel = model<IEmployment>('Employment', EmploymentSchema);
