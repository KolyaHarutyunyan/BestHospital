import { model, Schema, Types } from 'mongoose';
import { IClaim } from './interface';
import { ClaimStatus, ReceivableStatus } from './claim.constants';

const receivable = {
  placeService: { type: Types.ObjectId, ref: 'Place' },
  cptCode: { type: Number },
  totalUnits: { type: Number },
  totalBill: { type: Number },
  renderProvider: { type: Number },
  dateOfService: { start: { type: Date }, end: { type: Date } },
  status: { type: String, enum: ReceivableStatus },
  createdAt: { type: Date, default: Date.now() },
  bills: [{ type: Types.ObjectId, ref: 'billing' }],
};

export const ClaimSchema = new Schema({
  client: { type: Types.ObjectId, ref: 'Client' },
  staff: { type: Types.ObjectId, ref: 'Staff' },
  funder: { type: Types.ObjectId, ref: 'Funder' },
  totalCharge: { type: Number },
  ammountPaid: { type: Number, default: 0 },
  submittedDate: { type: Date },
  paymentRef: { type: String },
  link: { type: String },
  dateRange: { early: { type: Date }, latest: { type: Date } },
  status: { type: String, enum: ClaimStatus },
  createdDate: { type: Date, default: Date.now() },
  details: { type: String },
  receivable: [receivable],
});
// remaining
export const ClaimModel = model<IClaim>('claim', ClaimSchema);
