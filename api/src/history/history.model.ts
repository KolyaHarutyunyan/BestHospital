import { model, Schema, Types } from 'mongoose';
import { IHistory } from './interface';

export const historySchema = new Schema({
    date: { type: Date, default: Date.now },
    time: { type: String },
    title: { type: String }
});

export const HistoryModel = model<IHistory>('history', historySchema);