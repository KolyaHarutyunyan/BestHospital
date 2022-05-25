import {
   GET_FUNDING_SOURCE_BY_ID_SUCCESS,
   GET_FUNDING_SOURCES_SUCCESS,
} from "./fundingSource.types";

const initialState = {
   fundingSources: [],
   fundingSourceById: {},
};

export const fundingReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_FUNDING_SOURCES_SUCCESS:
         return {
            ...state,
            fundingSources: action.payload.fundingSources,
         };

      case GET_FUNDING_SOURCE_BY_ID_SUCCESS:
         return {
            ...state,
            fundingSourceById: action.payload.fundingSourceById,
         };

      default:
         return state;
   }
};
