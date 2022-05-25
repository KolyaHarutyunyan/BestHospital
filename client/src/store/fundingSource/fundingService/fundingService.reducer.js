import {
   GET_FUNDING_SERVICES_SUCCESS,
   GET_FUNDING_SERVICE_BY_ID_SUCCESS,
} from "./fundingService.type";

const initialState = {
   fundingServices: [],
   fundingServiceById: {},
};

export const fundingServiceReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_FUNDING_SERVICES_SUCCESS:
         return {
            ...state,
            fundingServices: action.payload.fundingServices,
         };

      case GET_FUNDING_SERVICE_BY_ID_SUCCESS:
         return {
            ...state,
            fundingServiceById: action.payload.fundingServiceById,
         };

      default:
         return state;
   }
};
