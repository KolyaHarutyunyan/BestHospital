import {
   getInvoicePayments,
   getInvoicePaymentById,
   createInvoicePayment,
   editInvoicePayment,
   deleteInvoicePayment,
   editInvoicePaymentStatus,
   addInvoiceInInvoicePayment,
} from "./invoicePayment.action.js";

export { invoicePaymentReducer } from "./invoicePayment.reducer";
export { watchInvoicePayment } from "./invoicePayment.saga";

export const invoicePaymentActions = {
   getInvoicePayments,
   getInvoicePaymentById,
   createInvoicePayment,
   editInvoicePayment,
   deleteInvoicePayment,
   editInvoicePaymentStatus,
   addInvoiceInInvoicePayment,
};
