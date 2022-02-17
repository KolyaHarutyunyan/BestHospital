import {
   ABORT_BILL_TRANSACTION,
   ADD_BILL_TRANSACTION,
   CREATE_BILL,
   EDIT_BILL_STATUS,
   GET_BILL_BY_ID,
   GET_BILLS,
} from "./bill.type";

export const getBills = () => {
   return {
      type: GET_BILLS,
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

export const addBillTransaction = (id, body) => {
   return {
      type: ADD_BILL_TRANSACTION,
      payload: { id, body },
   };
};

export const abortBillTransaction = (id) => {
   return {
      type: ABORT_BILL_TRANSACTION,
      payload: { id },
   };
};
