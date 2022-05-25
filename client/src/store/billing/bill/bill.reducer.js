import { GET_BILLS_SUCCESS, GET_BILL_BY_ID_SUCCESS } from "./bill.type";

const initialState = {
   bills: [],
   billById: {},
};

export const billReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_BILLS_SUCCESS:
         return {
            ...state,
            bills: action.payload.bills,
         };

      case GET_BILL_BY_ID_SUCCESS:
         return {
            ...state,
            billById: action.payload.billById,
         };

      default:
         return state;
   }
};
