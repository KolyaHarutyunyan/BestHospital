import { getClaims, getClaimById, generateClaim, editClaimStatus } from "./claim.action";

export { claimReducer } from "./claim.reducer";
export { watchClaim } from "./claim.saga";

export const claimActions = {
   getClaims,
   getClaimById,
   generateClaim,
   editClaimStatus,
};
