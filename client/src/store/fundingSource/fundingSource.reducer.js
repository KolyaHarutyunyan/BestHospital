import {
   GET_FUNDING_SOURCE_BY_ID_SUCCESS,
   GET_FUNDING_SOURCE_SUCCESS,
   GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
   GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
} from "./fundingSource.types";

const initialState = {
   fundingSourceList: [],
   fSelect: [],
   fundingSourceListReserve: [],
   fundingSourceServices: [],
   fundingSourceHistories: [],
};

export const fundingSourceReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_FUNDING_SOURCE_SUCCESS:
         return {
            ...state,
            fSelect: action.payload,
            fundingSourceList: action.payload,
            fundingSourceListReserve: action.payload,
         };

      case GET_FUNDING_SOURCE_BY_ID_SUCCESS:
         return {
            ...state,
            fundingSourceItem: action.payload,
         };

      case GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS:
         return {
            ...state,
            fundingSourceServices: action.payload.reverse(),
         };

      case GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS:
         return {
            ...state,
            fundingSourceHistories: action.payload,
         };

      default:
         return state;
   }
};
