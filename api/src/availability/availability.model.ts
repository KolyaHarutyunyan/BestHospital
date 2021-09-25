import { model, Schema, Types } from 'mongoose';
import { ScheduleStatus } from './availability.constants';
import { IAvailability } from './interface';

const AvailabilitySchema = new Schema({
    monday: [{ from: { type: String }, to: { type: String }, available: { type: Boolean } }],
    tuesday: [{ from: { type: String }, to: { type: String }, available: { type: Boolean } }],
    wednesday: [{ from: { type: String }, to: { type: String }, available: { type: Boolean } }],
    thursday: [{ from: { type: String }, to: { type: String }, available: { type: Boolean } }],
    friday: [{ from: { type: String }, to: { type: String }, available: { type: Boolean } }],
    saturday: [{ from: { type: String }, to: { type: String }, available: { type: Boolean } }],
    sunday: [{ from: { type: String }, to: { type: String }, available: { type: Boolean } }],
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ScheduleStatus
    },
});
export const AvailabilityModel = model<IAvailability>('Availability', AvailabilitySchema);
