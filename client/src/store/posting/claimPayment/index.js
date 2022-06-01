import {
   getClaimPayments,
   getClaimPaymentById,
   createClaimPayment,
   editClaimPayment,
   deleteClaimPayment,
   editClaimPaymentStatus,
   addClaimInClaimPayment,
   appendFilesToClaimPayment,
} from "./claimPayment.action.js";

export { claimPaymentReducer } from "./claimPayment.reducer";
export { watchClaimPayment } from "./claimPayment.saga";

export const claimPaymentActions = {
   getClaimPayments,
   getClaimPaymentById,
   createClaimPayment,
   editClaimPayment,
   deleteClaimPayment,
   editClaimPaymentStatus,
   addClaimInClaimPayment,
   appendFilesToClaimPayment,
};
