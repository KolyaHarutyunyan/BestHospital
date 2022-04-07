import {
   EDIT_CLAIM_STATUS,
   GENERATE_CLAIM,
   GET_CLAIMS,
   GET_CLAIM_BY_ID,
} from "./claim.type";

export const getClaims = () => {
   return {
      type: GET_CLAIMS,
   };
};

export const getClaimById = (id) => {
   return {
      type: GET_CLAIM_BY_ID,
      payload: { id },
   };
};

export const generateClaim = (group, body) => {
   return {
      type: GENERATE_CLAIM,
      payload: { group, body },
   };
};

export const editClaimStatus = (id, status, details) => {
   return {
      type: EDIT_CLAIM_STATUS,
      payload: { id, status, details },
   };
};
