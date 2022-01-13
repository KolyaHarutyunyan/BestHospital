import { model, Schema } from 'mongoose';
import { OvertimeStatus } from './overtime.constants';
import { IOverTime } from './interface';

const OverTimeSchema = new Schema({
  name: { type: String },
  type: { type: String, enum: OvertimeStatus },
  multiplier: { type: Number },
  threshold: { type: Number },
});
export const OverTimeModel = model<IOverTime>('Overtime', OverTimeSchema);
