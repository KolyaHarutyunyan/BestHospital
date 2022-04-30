import {
   CREATE_CLAIM_PAYMENT,
   DELETE_CLAIM_PAYMENT,
   EDIT_CLAIM_PAYMENT,
   EDIT_CLAIM_PAYMENT_STATUS,
   GET_CLAIM_PAYMENTS,
   GET_CLAIM_PAYMENT_BY_ID,
} from "./claimPayment.type";

export const getClaimPayments = () => {
   return {
      type: GET_CLAIM_PAYMENTS,
   };
};

export const getClaimPaymentById = (id) => {
   return {
      type: GET_CLAIM_PAYMENT_BY_ID,
      payload: { id },
   };
};

export const createClaimPayment = (body) => {
   return {
      type: CREATE_CLAIM_PAYMENT,
      payload: { body },
   };
};

export const editClaimPayment = (id, body) => {
   return {
      type: EDIT_CLAIM_PAYMENT,
      payload: { id, body },
   };
};

export const deleteClaimPayment = (id) => {
   return {
      type: DELETE_CLAIM_PAYMENT,
      payload: { id },
   };
};

export const editClaimPaymentStatus = (id, status, details) => {
   return {
      type: EDIT_CLAIM_PAYMENT_STATUS,
      payload: { id, status, details },
   };
};
