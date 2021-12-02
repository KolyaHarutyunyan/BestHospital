import { model, Schema, Types } from 'mongoose';
import { IHistory } from './interface';

export const historySchema = new Schema({
    resource: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Staff', 'Client', "Funder"]
    },
    user: { type: Types.ObjectId, ref: 'Staff' },
    createdDate: { type: Date, default: Date.now },
    time: { type: String },
    title: { type: String }
});

export const HistoryModel = model<IHistory>('history', historySchema);