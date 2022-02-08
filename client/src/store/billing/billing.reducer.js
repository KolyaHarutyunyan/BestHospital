import { GET_BILLINGS_SUCCESS, GET_BILLING_BY_ID_SUCCESS } from "./billing.type";

const initialState = {
   billings: [],
   billingById: {},
};

export const billingReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_BILLINGS_SUCCESS:
         return {
            ...state,
            billings: action.payload.billings,
         };

      case GET_BILLING_BY_ID_SUCCESS:
         return {
            ...state,
            billingById: action.payload.billingById,
         };
      default:
         return state;
   }
};
