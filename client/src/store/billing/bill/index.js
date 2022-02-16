import {
   getBills,
   getBillById,
   createBill,
   editBillStatus,
   addBillTransaction,
   abortBillTransaction,
} from "./bill.action";

export { billReducer } from "./bill.reducer";
export { watchBill } from "./bill.saga";

export const billActions = {
   getBills,
   getBillById,
   createBill,
   editBillStatus,
   addBillTransaction,
   abortBillTransaction,
};
