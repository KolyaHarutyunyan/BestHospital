import { CLOSE_CLAIM, GENERATE_CLAIM, GET_CLAIMS, GET_CLAIM_BY_ID } from "./claim.type";

export const getClaims = (data) => {
   return {
      type: GET_CLAIMS,
      payload: { data },
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

export const closeClaim = (id, details) => {
   return {
      type: CLOSE_CLAIM,
      payload: { id, details },
   };
};
