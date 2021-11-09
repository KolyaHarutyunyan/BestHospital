import { model, Schema, Types } from 'mongoose';
import { IPayCode } from './interface';

const PayCodeSchema = new Schema({
  name: { type: String },
  employmentId: { type: Types.ObjectId, ref: 'Employment' },
  payCodeTypeId: { type: Types.ObjectId, ref: 'PayCodeType' },
  rate: { type: Number },
  active: { type: Boolean },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Schema.Types.Mixed, default: 'Precent' },
});

export const PayCodeModel = model<IPayCode>('PayCode', PayCodeSchema);
