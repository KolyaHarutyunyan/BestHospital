import { model, Schema, Types } from 'mongoose';
import { IAppointment } from './interface';

export const appointmentSchema = new Schema({
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

export const HistoryModel = model<IAppointment>('appointment', appointmentSchema);