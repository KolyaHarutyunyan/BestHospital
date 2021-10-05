import { model, Schema, Types } from 'mongoose';
import { IEmployment, ScheduleStatus } from '../employment';
import { OvertimeStatus } from './overtime.constants';
import { IOverTime } from './interface';

const OverTimeSchema = new Schema({
    name: { type: String },
    type: { type: String, enum: OvertimeStatus },
    multiplier: { type: Number },
    threshold: { type: Number }
});
export const OverTimeModel = model<IOverTime>('Overtime', OverTimeSchema);