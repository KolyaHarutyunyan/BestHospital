import {
   DELETE_INVOICE,
   EDIT_INVOICE,
   GENERATE_INVOICE,
   GET_INVOICES,
   GET_INVOICE_BY_ID,
} from "./invoice.type";

export const getInvoices = () => {
   return {
      type: GET_INVOICES,
   };
};

export const getInvoiceById = (id) => {
   return {
      type: GET_INVOICE_BY_ID,
      payload: { id },
   };
};

export const generateInvoice = (body) => {
   return {
      type: GENERATE_INVOICE,
      payload: { body },
   };
};

export const editInvoice = (id, body) => {
   return {
      type: EDIT_INVOICE,
      payload: { id, body },
   };
};

export const deleteInvoice = (id) => {
   return {
      type: DELETE_INVOICE,
      payload: { id },
   };
};
