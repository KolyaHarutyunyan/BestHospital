import { GET_CLAIMS_SUCCESS, GET_CLAIM_BY_ID_SUCCESS } from "./claim.type";

const initialState = {
   claims: [],
   claimById: {},
};

export const claimReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_CLAIMS_SUCCESS:
         return {
            ...state,
            claims: action.payload.claims,
         };

      case GET_CLAIM_BY_ID_SUCCESS:
         return {
            ...state,
            claimById: action.payload.claimById,
         };
      default:
         return state;
   }
};
