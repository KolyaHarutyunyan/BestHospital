import { model, Schema, Types } from 'mongoose';
import { IEmployment, ScheduleStatus } from '../employment';
import { TerminationSchema } from '../termination';
import { EmploymentType } from './employment.constants';

const EmploymentSchema = new Schema({
  staffId: { type: Types.ObjectId, ref: 'Staff' },
  departmentId: { type: Types.ObjectId, ref: 'Department' },
  supervisor: { type: Types.ObjectId, ref: 'Staff', default: null },
  title: { type: Types.ObjectId, ref: 'Job' },
  schedule: { type: Number, enum: ScheduleStatus },
  type: { type: String, enum: EmploymentType },
  termination: TerminationSchema,
  active: { type: Boolean, default: false },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: null },
});

export const EmploymentModel = model<IEmployment>('Employment', EmploymentSchema);
