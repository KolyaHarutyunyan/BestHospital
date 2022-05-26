import {
   CREATE_FUNDING_MODIFIER,
   DELETE_FUNDING_MODIFIER,
   EDIT_FUNDING_MODIFIER,
} from "./fundingModifier.type";

export const createFundingModifier = (fundingId, body) => {
   return {
      type: CREATE_FUNDING_MODIFIER,
      payload: { fundingId, body },
   };
};

export const editFundingModifier = (fundingId, serviceId, body) => {
   return {
      type: EDIT_FUNDING_MODIFIER,
      payload: { fundingId, serviceId, body },
   };
};

export const deleteFundingModifier = (fundingId, serviceId) => {
   return {
      type: DELETE_FUNDING_MODIFIER,
      payload: { fundingId, serviceId },
   };
};
