import { model, Schema, Types } from 'mongoose';
import { IClaim } from './interface';
import { ClaimStatus } from './claim.constants';

export const ClaimSchema = new Schema({
    client: { type: Types.ObjectId, ref: 'Client' },
    staff: { type: Types.ObjectId, ref: 'Staff' },
    funder: { type: Types.ObjectId, ref: 'Funder' },
    totalCharge: { type: Number },
    ammountPaid: { type: Number },
    submittedDate: { type: Date },
    paymentRef: { type: String },
    link: { type: String },
    date: { type: Date },
    status: { type: String, enum: ClaimStatus },
    createdDate: { type: Date },
    receivable: [{ type: Types.ObjectId, ref: 'receivable' }]
});
// remaining
export const ClaimModel = model<IClaim>('claim', ClaimSchema);