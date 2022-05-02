import {
   GET_CLAIM_PAYMENTS_SUCCESS,
   GET_CLAIM_PAYMENT_BY_ID_SUCCESS,
} from "./claimPayment.type";

const initialState = {
   claimPayments: [],
   claimPaymentById: {},
};

export const claimPaymentReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_CLAIM_PAYMENTS_SUCCESS:
         return {
            ...state,
            claimPayments: action.payload.claimPayments,
         };

      case GET_CLAIM_PAYMENT_BY_ID_SUCCESS:
         return {
            ...state,
            claimPaymentById: action.payload.claimPaymentById,
         };
      default:
         return state;
   }
};
