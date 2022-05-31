import {
   ADD_CLAIM_IN_CLAIM_PAYMENT,
   APPEND_FILES_TO_CLAIM_PAYMENT,
   CREATE_CLAIM_PAYMENT,
   DELETE_CLAIM_PAYMENT,
   EDIT_CLAIM_PAYMENT,
   EDIT_CLAIM_PAYMENT_STATUS,
   GET_CLAIM_PAYMENTS,
   GET_CLAIM_PAYMENT_BY_ID,
} from "./claimPayment.type";

export const getClaimPayments = (data) => {
   return {
      type: GET_CLAIM_PAYMENTS,
      payload: { data },
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

export const addClaimInClaimPayment = (id, body) => {
   return {
      type: ADD_CLAIM_IN_CLAIM_PAYMENT,
      payload: { id, body },
   };
};

export const appendFilesToClaimPayment = (id, body) => {
   return {
      type: APPEND_FILES_TO_CLAIM_PAYMENT,
      payload: { id, body },
   };
};
