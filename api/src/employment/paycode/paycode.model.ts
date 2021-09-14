import { model, Schema, Types } from 'mongoose';
// import { IPayCode } from '../paycode';

const PayCodeSchema = new Schema({
    employmentId: { type: Types.ObjectId, ref: 'Employment' },
    payCodeTypeId: { type: Types.ObjectId, ref: 'PayCodeType' },
    rate: { type: Number},
    active: {type: Boolean},
    startDate: { type: Date, default: Date.now },
    endDate: {type: Date, default: null}
});

export const PayCodeModel = model<any>('PayCode', PayCodeSchema);
