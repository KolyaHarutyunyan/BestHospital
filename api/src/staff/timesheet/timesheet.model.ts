import { model, Schema, Types } from 'mongoose';
import { ITimeSheet } from './interface';
import { TimesheetStatus } from './timesheet.constants';

const TimesheetSchema = new Schema({
  staffId: { type: Types.ObjectId, ref: 'Staff' },
  payCode: { type: Types.ObjectId, ref: 'PayCode' },
  description: { type: String },
  hours: { type: Number },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: null },
  createdDate: { type: Date, default: Date.now },
  totalAmount: { type: Number },
  regularPay: { type: Number },
  regularHours: { type: Number },
  overtimes: [
    { id: Types.ObjectId, amount: Number, hours: Number, rateType: String, name: String },
  ],
  status: { type: TimesheetStatus, default: TimesheetStatus.ACTIVE },
});

export const TimeSheetModel = model<ITimeSheet>('timesheet', TimesheetSchema);
