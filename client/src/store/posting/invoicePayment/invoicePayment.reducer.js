import {
   GET_INVOICE_PAYMENTS_SUCCESS,
   GET_INVOICE_PAYMENT_BY_ID_SUCCESS,
} from "./invoicePayment.type";

const initialState = {
   invoicePayments: [],
   invoicePaymentById: {},
};

export const invoicePaymentReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_INVOICE_PAYMENTS_SUCCESS:
         return {
            ...state,
            invoicePayments: action.payload.invoicePayments,
         };

      case GET_INVOICE_PAYMENT_BY_ID_SUCCESS:
         return {
            ...state,
            invoicePaymentById: action.payload.invoicePaymentById,
         };
      default:
         return state;
   }
};
