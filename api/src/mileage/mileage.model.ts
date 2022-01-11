import { model, Schema } from 'mongoose';
import { IMileage } from './interface/mileage.interface';

const Mileagechema = new Schema({
  compensation: { type: Number },
  startDate: { type: Date },
  endDate: { type: Date, default: Date.now },
});

export const MileageModel = model<IMileage>('Mileage', Mileagechema);
