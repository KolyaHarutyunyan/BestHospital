import { model, Schema, Types } from 'mongoose';
import { IAvailability } from './interface';


const AvailabilitySchema = new Schema({
    monday: [{ from: { type: Number }, to: { type: Number }, available: { type: Boolean } }],
    tuesday: [{ from: { type: Number }, to: { type: Number }, available: { type: Boolean } }],
    wednesday: [{ from: { type: Number }, to: { type: Number }, available: { type: Boolean } }],
    thursday: [{ from: { type: Number }, to: { type: Number }, available: { type: Boolean } }],
    friday: [{ from: { type: Number }, to: { type: Number }, available: { type: Boolean } }],
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
