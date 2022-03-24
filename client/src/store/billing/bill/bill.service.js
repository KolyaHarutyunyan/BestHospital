import axios from "axios";

export const billService = {
   getBillsService: (data) => {
      if (data) {
         return axios.get(`/billing/?limit=${data.limit}&&skip=${data.skip}`, {
            auth: true,
         });
      }
      return axios.get("/billing", { auth: true });
   },

   getBillByIdService: (id, data) => {
      if (data) {
         return axios.get(
            `/billing/${id}/?limit=${data.limit}&&skip=${data.skip}`,
            { auth: true }
         );
      }
      return axios.get(`/billing/${id}`, { auth: true });
   },

   createBillService: (body) => axios.post("/billing", body, { auth: true }),

   editBillStatusService: (id, status) =>
      axios.patch(
         `/billing/${id}/setStatus?status=${status}`,
         {},
         { auth: true }
      ),

   editBillClaimStatusService: (id, status) =>
      axios.patch(
         `/billing/${id}/claimStatus?claimStatus=${status}`,
         {},
         { auth: true }
      ),

   editBillInvoiceStatusService: (id, status) =>
      axios.patch(
         `/billing/${id}/invoiceStatus?invoiceStatus=${status}`,
         {},
         { auth: true }
      ),

   addBillTransactionService: (id, body) =>
      axios.post(`/billing/addTransaction/${id}`, body, { auth: true }),

   abortBillTransactionService: (id, tsxId) =>
      axios.post(
         `/billing/${id}/abortTransaction/${tsxId}`,
         {},
         { auth: true }
      ),
};
