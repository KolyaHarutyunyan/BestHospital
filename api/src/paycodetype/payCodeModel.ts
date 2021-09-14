import { model, Schema, Types } from 'mongoose';
import { IEmployment, ScheduleStatus } from '../employment';
import { PayCodeTypeStatus } from './paycodetypes.constants';
// import { IPayCodeType } from './interface';

const PayCodeTypeSchema = new Schema({
    name: { type: String },
    code: { type: String },
    type: { type: String, enum: PayCodeTypeStatus },
    overtime: { type: Boolean },
    pto: { type: Boolean }
});
export const PayCodeTypeModel = model<any>('PayCodeType', PayCodeTypeSchema);