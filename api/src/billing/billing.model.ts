import { model, Schema, Types } from 'mongoose';
import { BillingStatus, InvoiceStatus, ClaimStatus } from './billing.constants';
import { IBilling } from './interface';

const BillingSchema = new Schema({
  appointment: { type: Types.ObjectId, ref: 'Appointment' },
  payer: { type: Types.ObjectId, ref: 'Funder' },
  client: { type: Types.ObjectId, ref: 'Client' },
  staff: { type: Types.ObjectId, ref: 'Staff' },
  authorization: { type: Types.ObjectId, ref: 'ClientAuth' },
  authService: { type: Types.ObjectId, ref: 'ClientAuthService' },
  placeService: { type: Types.ObjectId, ref: 'Place' },
  totalHours: { type: Number },
  totalUnits: { type: Number },
  dateOfService: { type: Date },
  billedRate: { type: Number },
  billedAmount: { type: Number, default: 0 },
  payerTotal: { type: Number, default: 0 },
  payerPaid: { type: Number, default: 0 },
  payerBalance: { type: Number },
  //payerBalance payerTotal - payerPaid
  clientResp: { type: Number, default: 0 },
  clientPaid: { type: Number, default: 0 },
  balance: { type: Number },
  clientBalance: { type: Number },
  location: { typ: String },
  claimStatus: { type: String, enum: ClaimStatus, default: ClaimStatus.NOTCLAIMED },
  invoiceStatus: { type: String, enum: InvoiceStatus, default: InvoiceStatus.NOTINVOICED },
  status: { type: String, enum: BillingStatus, default: 'OPEN' },
  createdDate: { type: Date, default: Date.now() },
  updatedDate: { type: Date, default: null },
});

export const BillingModel = model<IBilling>('billing', BillingSchema);
