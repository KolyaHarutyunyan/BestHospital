import { model, Schema, Types } from 'mongoose';
import { IPayCode } from './interface';

const PayCodeSchema = new Schema({
  employmentId: { type: Types.ObjectId, ref: 'Employment' },
  payCodeTypeId: { type: Types.ObjectId, ref: 'PayCodeType' },
  rate: { type: Number },
  terminationDate: { type: Date },
  startDate: { type: Date, default: Date.now },
});
// karox enq inactive sarqel u apppti mej cuyc chenq ta
export const PayCodeModel = model<IPayCode>('PayCode', PayCodeSchema);
