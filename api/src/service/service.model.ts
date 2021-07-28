import { model, Schema, Types } from 'mongoose';
import { IService } from './interface';

export const serviceSchema = new Schema({
    name: { type: String },
    displayCode: {type: String},
    category: {type: String}
});

export const ServiceModel = model<IService>('Service', serviceSchema);