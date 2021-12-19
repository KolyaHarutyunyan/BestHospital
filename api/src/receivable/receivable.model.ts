import { model, Schema, Types } from 'mongoose';
import { IReceivable } from './interface';

export const ReceivableSchema = new Schema({
    placeService: { type: Types.ObjectId, ref: 'Place' },
    cptCode: { type: Number },
    totalUnits: { type: Number },
    totalBill: { type: Number },
    renderProvider: { type: Number },
    dateOfService: { type: Date },
    bills: [{ type: Types.ObjectId, ref: 'billing' }]
});

export const ReceivableModel = model<IReceivable>('receivable', ReceivableSchema);