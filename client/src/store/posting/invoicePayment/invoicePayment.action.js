import {
   ADD_INVOICE_IN_INVOICE_PAYMENT,
   CREATE_INVOICE_PAYMENT,
   DELETE_INVOICE_PAYMENT,
   EDIT_INVOICE_PAYMENT,
   EDIT_INVOICE_PAYMENT_STATUS,
   GET_INVOICE_PAYMENTS,
   GET_INVOICE_PAYMENT_BY_ID,
} from "./invoicePayment.type";

export const getInvoicePayments = () => {
   return {
      type: GET_INVOICE_PAYMENTS,
   };
};

export const getInvoicePaymentById = (id) => {
   return {
      type: GET_INVOICE_PAYMENT_BY_ID,
      payload: { id },
   };
};

export const createInvoicePayment = (body) => {
   return {
      type: CREATE_INVOICE_PAYMENT,
      payload: { body },
   };
};

export const editInvoicePayment = (id, body) => {
   return {
      type: EDIT_INVOICE_PAYMENT,
      payload: { id, body },
   };
};

export const deleteInvoicePayment = (id) => {
   return {
      type: DELETE_INVOICE_PAYMENT,
      payload: { id },
   };
};

export const editInvoicePaymentStatus = (id, status, details) => {
   return {
      type: EDIT_INVOICE_PAYMENT_STATUS,
      payload: { id, status, details },
   };
};

export const addInvoiceInInvoicePayment = (id, body) => {
   return {
      type: ADD_INVOICE_IN_INVOICE_PAYMENT,
      payload: { id, body },
   };
};
