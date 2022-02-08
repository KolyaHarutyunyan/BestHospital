import axios from "axios";

export const billingService = {
   getBillingsService: () => axios.get("/billing", { auth: true }),

   getBillingByIdService: (id) => axios.get(`/billing/${id}`),

   createBillingService: (body) => axios.post("/billing", body, { auth: true }),

   editBillingStatusService: (id, status) =>
      axios.patch(`/billing/${id}/setStatus?status=${status}`, {}, { auth: true }),

   addBillingTransactionService: (id, body) =>
      axios.post(`/billing/addTransaction/${id}`, body, { auth: true }),

   abortBillingTransactionService: (id) =>
      axios.post(`/billing/abortTransaction/${id}`, { auth: true }),
};
