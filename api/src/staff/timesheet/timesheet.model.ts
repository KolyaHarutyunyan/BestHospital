import { model, Schema, Types } from 'mongoose';
import { ITimeSheet } from './interface';

const TimesheetSchema = new Schema({
    staffId: { type: Types.ObjectId, ref: 'Staff' },
    payCode: { type: Types.ObjectId, ref: 'PayCode' },
    //payTable: [{regular, }]
    description: { type: String },
    hours: { type: Number },
    startDate: { type: Date, default: Date.now },
    endDate: {type: Date, default: null},
    createdDate: {type: Date, default: Date.now},
    totalAmount: {type: Number}
});

export const TimeSheetModel = model<ITimeSheet>('timesheet', TimesheetSchema);