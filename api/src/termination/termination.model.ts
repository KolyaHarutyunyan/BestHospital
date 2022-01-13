import { model, Schema } from 'mongoose';
import { ITermination } from './interface';

export const TerminationSchema = new Schema({
  reason: { type: String },
  date: { type: Date, default: Date.now },
});

export const TerminationModel = model<ITermination>('Termination', TerminationSchema);
