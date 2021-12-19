import { model, Schema, Types } from 'mongoose';
import { IReceivable } from './interface';
import { ReceivableStatus } from './receivable.constants';

export const ReceivableSchema = new Schema({
    placeService: { type: Types.ObjectId, ref: 'Place' },
    cptCode: { type: Number },
    totalUnits: { type: Number },
    totalBill: { type: Number },
    renderProvider: { type: Number },
    dateOfService: { type: Date },
    status: { type: String, enum: ReceivableStatus },
    bills: [{ type: Types.ObjectId, ref: 'billing' }]
});

export const ReceivableModel = model<IReceivable>('receivable', ReceivableSchema);