import {
   ABORT_BILL_TRANSACTION,
   ADD_BILL_TRANSACTION,
   CREATE_BILL,
   EDIT_BILL_STATUS,
   GET_BILL_BY_ID,
   GET_BILLS,
   EDIT_BILL_CLAIM_STATUS,
   EDIT_BILL_INVOICE_STATUS,
   GET_BILL_TRANSACTION,
} from "./bill.type";

export const getBills = (data) => {
   return {
      type: GET_BILLS,
      payload: { data },
   };
};

export const getBillById = (id) => {
   return {
      type: GET_BILL_BY_ID,
      payload: { id },
   };
};

export const createBill = (body) => {
   return {
      type: CREATE_BILL,
      payload: { body },
   };
};

export const editBillStatus = (id, status) => {
   return {
      type: EDIT_BILL_STATUS,
      payload: { id, status },
   };
};

export const editBillClaimStatus = (id, status) => {
   return {
      type: EDIT_BILL_CLAIM_STATUS,
      payload: { id, status },
   };
};

export const editBillInvoiceStatus = (id, status) => {
   return {
      type: EDIT_BILL_INVOICE_STATUS,
      payload: { id, status },
   };
};

export const addBillTransaction = (id, body) => {
   return {
      type: ADD_BILL_TRANSACTION,
      payload: { id, body },
   };
};

export const abortBillTransaction = (id, tsxId) => {
   return {
      type: ABORT_BILL_TRANSACTION,
      payload: { id, tsxId },
   };
};

export const getBillTransaction = (billingId, data) => {
   return {
      type: GET_BILL_TRANSACTION,
      payload: { billingId, data },
   };
};
