import { model, Schema, Types } from 'mongoose';
import { IHistory } from './interface';

export const historySchema = new Schema({
    resource: {
        type: Schema.Types.ObjectId,
        required: true,
        // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
        // will look at the `onModel` property to find the right model.
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