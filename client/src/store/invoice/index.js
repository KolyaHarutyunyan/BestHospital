import {
   getInvoices,
   getInvoiceById,
   generateInvoice,
   editInvoice,
   deleteInvoice,
} from "./invoice.action";

export { invoiceReducer } from "./invoice.reducer";
export { watchInvoice } from "./invoice.saga";

export const invoiceActions = {
   getInvoices,
   getInvoiceById,
   generateInvoice,
   editInvoice,
   deleteInvoice,
};
