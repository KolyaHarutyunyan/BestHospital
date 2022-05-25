import {
   CREATE_FUNDING_SERVICE,
   EDIT_FUNDING_SERVICE,
   GET_FUNDING_SERVICES,
   GET_FUNDING_SERVICE_BY_ID,
} from "./fundingService.type";

export const createFundingService = (fundingId, body) => {
   return {
      type: CREATE_FUNDING_SERVICE,
      payload: { fundingId, body },
   };
};

export const editFundingService = (serviceId, body) => {
   return {
      type: EDIT_FUNDING_SERVICE,
      payload: { serviceId, body },
   };
};

export const getFundingServices = (fundingId) => {
   return {
      type: GET_FUNDING_SERVICES,
      payload: { fundingId },
   };
};

export const getFundingServiceById = (serviceId) => {
   return {
      type: GET_FUNDING_SERVICE_BY_ID,
      payload: { serviceId },
   };
};
