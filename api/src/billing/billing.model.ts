import { model, Schema, Types } from 'mongoose';
import { BillingStatus, InvoiceStatus, ClaimStatus } from './billing.constants';
import { IBilling } from './interface';

const TransactionSchema = new Schema({
  date: { type: Date },
  amount: { type: Number },
  paymentRef: { type: String },
  creator: { type: Types.ObjectId, ref: 'Staff' },
  note: { type: String },
  status: { type: String },
});

const BillingSchema = new Schema({
  appointment: { type: Types.ObjectId, ref: 'Appointment' },
  payer: { type: Types.ObjectId, ref: 'Funder' },
  client: { type: Types.ObjectId, ref: 'Client' },
  staff: { type: Types.ObjectId, ref: 'Staff' },
  authorization: { type: Types.ObjectId, ref: 'ClientAuthorization' },
  authService: { type: Types.ObjectId, ref: 'ClientAuthorizationService' },
  placeService: { type: Types.ObjectId, ref: 'Place' },
  totalHours: { type: Number },
  totalUnits: { type: Number },
  dateOfService: { type: Date },
  billedRate: { type: Number },
  billedAmount: { type: Number, default: 0 },
  payerTotal: { type: Number, default: 0 },
  payerPaid: { type: Number, default: 0 },
  clientResp: { type: Number, default: 0 },
  clientPaid: { type: Number, default: 0 },
  balance: { type: Number },
  location: { typ: String },
  claimStatus: { type: String, enum: ClaimStatus, default: 'NOTCLAIMED' },
  invoiceStatus: { type: String, enum: InvoiceStatus, default: 'NOTINVOICED' },
  status: { type: String, enum: BillingStatus, default: 'OPEN' },
  transaction: [TransactionSchema],
  createdDate: { type: Date, default: Date.now() },
  updatedDate: { type: Date, default: null },
});

export const BillingModel = model<IBilling>('billing', BillingSchema);
