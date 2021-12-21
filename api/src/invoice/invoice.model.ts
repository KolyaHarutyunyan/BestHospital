import { model, Schema, Types } from 'mongoose';
import { InvoiceStatus } from '../billing/billing.constants';
import { IInvoice } from './interface/invoice.interface';

const InvoiceSchema = new Schema({
    client: { type: Types.ObjectId, ref: 'Client' },
    invoiceTotal: { type: Number },
    totalTime: { type: Number },
    dueDate: { type: Date },
    downloadLink: { type: String },
    status: { type: String, enum: InvoiceStatus },
    receivable: [{ type: Types.ObjectId, ref: 'receivable' }],
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