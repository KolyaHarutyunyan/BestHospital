import {
   ABORT_BILLLING_TRANSACTION,
   ADD_BILLLING_TRANSACTION,
   CREATE_BILLING,
   EDIT_BILLING_STATUS,
   GET_BILLINGS,
   GET_BILLING_BY_ID,
} from "./billing.type";

export const getBillings = () => {
   return {
      type: GET_BILLINGS,
   };
};

export const getBillingById = (id) => {
   return {
      type: GET_BILLING_BY_ID,
      payload: { id },
   };
};

export const createBilling = (body) => {
   return {
      type: CREATE_BILLING,
      payload: { body },
   };
};

export const editBillingStatus = (id, status) => {
   return {
      type: EDIT_BILLING_STATUS,
      payload: { id, status },
   };
};

export const addBillingTransaction = (id, body) => {
   return {
      type: ADD_BILLLING_TRANSACTION,
      payload: { id, body },
   };
};

export const abortBillingTransaction = (id) => {
   return {
      type: ABORT_BILLLING_TRANSACTION,
      payload: { id },
   };
};
