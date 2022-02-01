import { GET_INVOICES_SUCCESS, GET_INVOICE_BY_ID_SUCCESS } from "./invoice.type";

const initialState = {
   invoices: [],
   invoiceById: {},
};

export const invoiceReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_INVOICES_SUCCESS:
         return {
            ...state,
            invoices: action.payload.invoices,
         };

      case GET_INVOICE_BY_ID_SUCCESS:
         return {
            ...state,
            invoiceById: action.payload.invoiceById,
         };
      default:
         return state;
   }
};
