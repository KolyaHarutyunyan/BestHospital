import axios from "axios";

export const billService = {
   getBillsService: () =>
      axios.get("/billing?claimStatus=NOTCLAIMED", { auth: true }),

   getBillByIdService: (id) => axios.get(`/billing/${id}`),

   createBillService: (body) => axios.post("/billing", body, { auth: true }),

   editBillStatusService: (id, status) =>
      axios.patch(
         `/billing/${id}/setStatus?status=${status}`,
         {},
         { auth: true }
      ),

   addBillTransactionService: (id, body) =>
      axios.post(`/billing/addTransaction/${id}`, body, { auth: true }),

   abortBillTransactionService: (id) =>
      axios.post(`/billing/abortTransaction/${id}`, { auth: true }),
};
