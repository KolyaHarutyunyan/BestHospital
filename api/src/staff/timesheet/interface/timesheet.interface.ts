import { Document } from 'mongoose';
import { TimesheetStatus } from '../timesheet.constants';
import { IPaytableItem } from './paytable.interface';

export interface ITimeSheet extends Document {
  staffId: string;
  payCode: string;
  description: string;
  hours: number;
  amount: number;
  startDate: Date;
  endDate: Date;
  createdDate: Date;
  totalAmount: number;
  regularHours: number;
  regularPay: number;
  overtimes: IPaytableItem[];
  status: TimesheetStatus;
}
