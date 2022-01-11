import { model, Schema, Types } from 'mongoose';
import { ReceivableStatus } from '../claim/claim.constants';
import { InvoiceStatus } from './invoice.constants';
import { IInvoice } from './interface/invoice.interface';

const receivable = {
  dateOfService: { start: { type: Date }, end: { type: Date } },
  serviceDate: { type: Date },
  hours: { type: Number },
  amountTotal: { type: Number },
  clientResp: { type: Number },
  clientPaid: { type: Number },
  balance: { type: Number },
  cptCode: { type: Number },
  status: { type: String, enum: ReceivableStatus },
  // description: { typ: String },
  bills: [{ type: Types.ObjectId, ref: 'billing' }],
};

const InvoiceSchema = new Schema({
  client: { type: Types.ObjectId, ref: 'Client' },
  dateRange: { early: { type: Date }, latest: { type: Date } },
  invoiceTotal: { type: Number },
  totalTime: { type: Number },
  dueDate: { type: Date },
  downloadLink: { type: String },
  status: { type: String, enum: InvoiceStatus },
  receivable: [receivable],
});

export const InvoiceModel = model<IInvoice>('invoice', InvoiceSchema);

// Id - unique id
// Date range - start is the date of the earliest bill used in the invoice, end is the latest date
// Client - dynamic reference for the client
// Invoice total - the total amount for the invoice, sum of all the line items in the invoice
// Receivables - a table of all receivables in the invoice
// Total time - the total hours for all receivable in the invoice
// Due date - a date to be discussed later
// Pdf download link - the link of the pdf file for downloading
// Status - [Pending, submitted, posted, cancelled]
