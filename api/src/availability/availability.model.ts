import { model, Schema, Types } from 'mongoose';
import { IAvailability } from './interface';


const AvailabilitySchema = new Schema({
    monday: [{ from: { type: String }, to: { type: String }, available: { type: Boolean } }],
    tuesday: [{ from: { type: String }, to: { type: String }, available: { type: Boolean } }],
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
        // will look at the `onModel` property to find the right model.
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Client', 'Staff']
    },
});


export const AvailabilityModel = model<IAvailability>('Availability', AvailabilitySchema);
